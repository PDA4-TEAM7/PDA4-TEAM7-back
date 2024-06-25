import { Request, Response } from "express";
import { UpdateRecencyHoldingAPI } from "../services/updateRecencyHoldingAPI";
import recencyAPI from "../services/recencyAPI";
export const updateAllHoldings = async (req: Request, res: Response) => {
  try {
    await UpdateRecencyHoldingAPI.updateAllHoldings();
    res.status(200).json("최근 거래 내역:current_holding 업데이트 완료");
  } catch (error) {
    console.log(error);
  }
};

export const updateAllHistory = async (req: Request, res: Response) => {
  try {
    await UpdateRecencyHoldingAPI.updateAllHistory();
    res.status(200).json("최근 거래 내역:updateAllHistory 업데이트 완료");
  } catch (error) {
    console.log(error);
  }
};

export const getMySubRecencyTradingHistory = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  try {
    const mySubRecencyTradingHistory = await recencyAPI.getMySubRecencyTradingHistory(uid);
    console.log("mySubRecencyTradingHistory", mySubRecencyTradingHistory);
    res.status(200).json(mySubRecencyTradingHistory);
  } catch (error) {
    console.log(error);
  }
};
