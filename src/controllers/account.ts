import { Request, Response } from "express";

export const setAccount = async (req: Request, res: Response) => {
  try {
    const { account, appkey, appsecretkey, uid } = req.body;
    //TODO: account 추가하기. appkey, appsecretkey로 access 토큰 생성(한투API)해서 account테이블에 추가.
    return res
      .status(200)
      .json({ message: "Hello make account", uid, account });
  } catch (error) {
    console.log("account make error", error);
    return res.sendStatus(401);
  }
};
