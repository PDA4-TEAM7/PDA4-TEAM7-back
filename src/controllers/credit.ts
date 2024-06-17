import { Request, Response } from "express";
import creditAPI from "../services/creditAPI";

export const getMyCredit = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const { credit } = await creditAPI.getMyCredit(uid);
  return res.status(200).json(credit);
};
