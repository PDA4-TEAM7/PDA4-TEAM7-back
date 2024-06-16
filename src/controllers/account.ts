import { Request, Response } from "express";
import { Account } from "../models/account";
import { User } from "../models/user";
import { HantuTokenApi, IAccessRes } from "../services/hantuTokenAPI";
import { StockAccountApi } from "../services/stockAccountAPI";

export const setAccount = async (req: Request, res: Response) => {
  try {
    //accountNo는 8자리 숫자
    const { accountNo, uid, appkey, appsecretkey } = req.body;
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
      app_secret_key: appsecretkey,
      access_token: accessToken,
      access_token_valid_dt: new Date(accessRes.access_token_token_expired),
      account_number: accountNo,
    });

    //4. 주식잔고조회 날리기.
    const stockAccountApi = new StockAccountApi(appkey, appsecretkey, accessToken);
    const inquirePriceRes = await stockAccountApi.inquireBalance(accountNo);
    console.log("inquire Price : ", inquirePriceRes);
    //5. output1의 값으로 stock_in_account 추가
    //6. output2로 평가금액합계, 등 정보 추가
    return res.status(200).json({ message: "Hello make account", newAccount, inquirePrice: inquirePriceRes });
  } catch (error) {
    //2. 토큰 발급안되면 잘못된키.실패 내보내기.
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    return res.status(200).json({ message: "Hello make account" });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};

export const getAccountList = async (req: Request, res: Response) => {
  try {
    const { account, appkey, appsecretkey, uid } = req.body;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    return res.status(200).json({ message: "Hello make account", uid, account });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
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
