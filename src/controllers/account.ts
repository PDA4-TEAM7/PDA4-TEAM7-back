import { Request, Response } from "express";
import { Account } from "../models/account";
import { User } from "../models/user";
import { HantuTokenApi, IAccessRes } from "../services/apis/hantuTokenAPI";
import { IStock, StockAccountApi } from "../services/apis/stockAccountAPI";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock, stockAttributes } from "../models/stock";

//내 계정 추가
export const setAccount = async (req: Request, res: Response) => {
  try {
    //accountNo는 8자리 숫자
    const { accountNo, appkey, appsecretkey } = req.body;
    const { uid } = (req as any).user;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    //user가져오기.
    const user = await User.findByPk(uid);
    if (!user) throw Error;
    console.log("userID ", user.user_id);
    //1. 해당 appkey로 토큰 발급받기.
    const tokenApi = new HantuTokenApi();
    const accessRes: IAccessRes = await tokenApi.getToken(appkey, appsecretkey);
    //3. 발급된 토큰으로 account 생성.
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
    //5-0. 없는 종목 stock테이블에 추가.
    for (let data of stocks) {
      let st = await Stock.findOne({ where: { code: data.pdno } });
      if (!st) throw Error(`없는 주식번호입니다. 어째서? pdno: ${data.pdno}`);
      //5. output1의 값으로 stock_in_account 추가
      const newStockInAccount = await Stock_in_account.create({
        account_id: newAccount.account_id,
        stock_id: st.stock_id,
        market_id: 1,
        quantity: data.hldg_qty,
        pchs_amt: data.pchs_amt,
        evlu_amt: data.evlu_amt,
        evlu_pfls_amt: data.evlu_pfls_amt,
      });
    }
    const accountStocks = await Stock_in_account.findAll({ where: { account_id: newAccount.account_id } });
    //6. output2로 평가금액합계, 등 정보 추가
    return res.status(200).json({ message: "Hello make account", newAccount, accountStocks });
  } catch (error) {
    //2. 토큰 발급안되면 잘못된키.실패 내보내기.
    console.log("account make error", error);
    return res.sendStatus(401);
  }
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
    const accountList = await Account.findAll({ where: { uid: uid }, attributes: ["account_number"] });
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    console.log("lsit:", accountList);
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
