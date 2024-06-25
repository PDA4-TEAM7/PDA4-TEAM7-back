import { Request, Response } from "express";
import UserAPI from "../services/userAPI";
import { User } from "../models/user";

export const getUserInfo = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const userInfo = await UserAPI.getUserInfo(uid);
  return res.status(200).json({
    user_id: userInfo?.user_id,
    username: userInfo?.username,
    introduce: userInfo?.introduce,
    credit: userInfo?.credit,
  });
};

export const setUserInfo = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const user = await User.findByPk(uid);
  if (!user) return res.sendStatus(400);
  user.username = req.body.username;
  user.introduce = req.body.introduce;
  user.save();
  return res.status(200).json({ ...user });
};
export const setCharge = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const user = await User.findByPk(uid);
  if (!user) return res.sendStatus(400);

  user.credit = user.credit + req.body.addCredit;
  user.save();
  return res.status(200).json({ credit: user.credit });
};

export const setPassword = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const userInfo = await UserAPI.getUserInfo(uid);
  const user = await User.findByPk(uid);
  if (!user) return res.sendStatus(400);
  user.password = req.body.password;
  user.save();
  return res.status(200).json({ success: true });
};
