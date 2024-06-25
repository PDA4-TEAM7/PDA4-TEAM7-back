import { Request, Response } from "express";
import UpdateRecencyHoldingAPI from "../services/updateRecencyHoldingAPI";
export const updateAllHoldings = async (req: Request, res: Response) => {
  try {
    await UpdateRecencyHoldingAPI.updateAllHoldings();
    res.status(200).json("최근 거래 내역:current_holding 업데이트 완료");
  } catch (error) {
    console.log(error);
  }
};
