import { Request, Response } from "express";
import { Account } from "../models/account";
import { User } from "../models/user";
import { HantuTokenApi, IAccessRes } from "../services/apis/hantuTokenAPI";
import { IStock, StockAccountApi } from "../services/apis/stockAccountAPI";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock, stockAttributes } from "../models/stock";
import { Trading_history } from "../models/trading_history";
import { setDateByOrd } from "../utils/time";

//내 계정 추가
export const setAccount = async (req: Request, res: Response) => {
  try {
    const { accountNo, appkey, appsecretkey } = req.body; //accountNo는 8자리 숫자
    const { uid } = (req as any).user;
    const user = await User.findByPk(uid);
    if (!user) throw Error;

    //1. 해당 appkey로 토큰 발급받기.
    const tokenApi = new HantuTokenApi();
    const accessRes: IAccessRes = await tokenApi.getToken(appkey, appsecretkey);
    if (!accessRes) throw Error("fail to get access Token. check key value");
    //2. 발급된 토큰으로 account 생성.
    const accessToken = accessRes.access_token;
    const newAccount = await Account.create({
      uid: user?.uid,
      app_key: appkey,
      app_secret: appsecretkey,
      access_token: accessToken,
      access_token_valid_dt: new Date(accessRes.access_token_token_expired),
      account_number: accountNo,
    });

    //4. 주식잔고조회 날리기.
    const stockAccountApi = new StockAccountApi(appkey, appsecretkey, accessToken);
    const inquirePriceRes = await stockAccountApi.inquireBalance(accountNo);
    const stocks: IStock[] = inquirePriceRes.output1;

    //5. output1의 값으로 stock_in_account 추가
    for (let data of stocks) {
      let st = await Stock.findOne({ where: { code: data.pdno } });
      if (!st) throw Error(`없는 주식번호입니다. 어째서? pdno: ${data.pdno}`);
      await Stock_in_account.create({
        account_id: newAccount.account_id,
        stock_id: st.stock_id,
        market_id: 1,
        hldg_qty: data.hldg_qty,
        pchs_amt: data.pchs_amt,
        evlu_amt: data.evlu_amt,
        evlu_pfls_amt: data.evlu_pfls_amt,
      });
    }
    const acountAsset = inquirePriceRes.output2;
    //6. output2로 평가금액합계, 등 정보 추가
    const thisAccount = await Account.findByPk(newAccount.account_id);
    if (!thisAccount) {
      console.error(`Account with ID ${newAccount.account_id} not found.`);
      return;
    }
    thisAccount.pchs_amt_smtl_amt = acountAsset[0].pchs_amt_smtl_amt; //매입금액합계금액
    thisAccount.evlu_amt_smtl_amt = acountAsset[0].evlu_amt_smtl_amt; //평가금액합계금액
    thisAccount.evlu_pfls_smtl_amt = acountAsset[0].evlu_pfls_smtl_amt; //평가손익합계금액
    await thisAccount.save();

    //TODO: 7.거래 내역 추가하기 account_id에 계좌 식별 값,
    const inquireTradingHistory = await stockAccountApi.inquireDailyCCLD(accountNo);
    for (let data of inquireTradingHistory) {
      let st = await Stock.findOne({ where: { code: data.pdno } });
      if (!st) throw Error(`없는 주식번호입니다. 어째서? pdno: ${data.pdno}`);

      const tradingHistory = Trading_history.create({
        account_id: newAccount.account_id,
        stock_id: st.stock_id,
        sll_buy_dvsn_cd: data.sll_buy_dvsn_cd, //매도 01 매수 02
        trade_dt: setDateByOrd(data.ord_dt, data.ord_tmd), //"ord_dt": "20240618", ord_tmd:105619
        tot_ccld_qty: data.tot_ccld_qty, //주식수
        tot_ccld_amt: data.tot_ccld_amt, //금액
      });
    }

    const accountStocks = await Stock_in_account.findAll({
      where: { account_id: newAccount.account_id },
    });
    return res.status(200).json({ message: "Hello make account", newAccount, accountStocks });
  } catch (error) {
    //2. 토큰 발급안되면 잘못된키.실패 내보내기.
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
//거래내역 조회
export const getTradingHistory = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const account = await Account.findOne({ where: { account_id: accountId } });
  if (!account) {
    console.log("계좌 못찾음");
    return res.sendStatus(400);
  }
  //TODO: 토큰 만료됐을때 새로 발급받는 로직 추가해야함

  const stockAccountApi = new StockAccountApi(account.app_key, account.app_secret, account.access_token);
  const inquireTradingHistory = await stockAccountApi.inquireDailyCCLD(account.account_number || "");
  // 거래내역 추가 account_id에 계좌 식별 값,
  // const tradingHistory = Trading_history.create({
  //   account_id:  newAccount.account_id,
  //   stock_id: number;
  //   sll_buy_dvsn_cd: string;
  //   trade_dt: Date;
  //   tot_ccld_qty: number;
  //   tot_ccld_amt: number;
  // })
  res.json(inquireTradingHistory);
};
// accountId로 특정 계정 조회
export const getAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    const accountStocks = await Stock_in_account.findAll({
      where: { account_id: accountId },
      include: {
        model: Stock,
        attributes: ["name"],
      },
    });

    return res.status(200).json({ message: "Hello get account", accountStocks: accountStocks });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
// 내 계정리스트 조회 (계좌번호..)
export const getMyAccountList = async (req: Request, res: Response) => {
  try {
    const { uid } = (req as any).user;
    const accountList = await Account.findAll({
      where: { uid: uid },
      attributes: ["account_id", "account_number"],
    });
    return res.status(200).json({ message: "my account list", accountList });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
//내 계정 제거
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { account, appkey, appsecretkey, uid } = req.body;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    return res.status(200).json({ message: "Hello make account", uid, account });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
