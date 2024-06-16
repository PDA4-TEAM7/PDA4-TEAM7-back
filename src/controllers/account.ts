import { Request, Response } from "express";
import { Account } from "../models/account";
export const setAccount = async (req: Request, res: Response) => {
  try {
    const { account, appkey, appsecretkey } = req.body;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    //user가져오기.
    //1. 해당 appkey로 토큰 발급받기.
    //2. 토큰 발급안되면 잘못된키.실패 내보내기.
    //3. 발급된 토큰으로 account 생성.
    //4. 주식잔고조회 날리기.
    //5. output1의 값으로 stock_in_account 추가
    //6. output2로 평가금액합계, 등 정보 추가
    return res.status(200).json({ message: "Hello make account", uid, account });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    return res.status(200).json({ message: "Hello make account", uid, account });
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
