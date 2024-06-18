import { Request, Response } from "express";
import UserAPI from "../services/userAPI";
export const getUserInfo = async (req: Request, res: Response) => {
  const uid = req.user!.uid;
  const userInfo = await UserAPI.getUserInfo(uid);
  return res.status(200).json({ ...userInfo });
};
