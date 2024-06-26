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
    res.status(200).json(mySubRecencyTradingHistory);
  } catch (error) {
    console.log(error);
  }
};

export const getStockInfoByAccountId = async (req: Request, res: Response) => {
  const { accountId, name } = req.params;
  try {
    const stockInfo = await recencyAPI.getStockInfoByAccountId(Number(accountId), name);
    res.status(200).json(stockInfo);
  } catch (error) {
    console.log(error);
  }
};

export const getInvestIdstTop5 = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  try {
    const idstTop5 = await recencyAPI.getInvestIdstTop5(uid);
    res.status(200).json(idstTop5);
  } catch (error) {
    console.log(error);
  }
};

export const getStockListByIdst = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const { name } = req.params;
  try {
    const stockList = await recencyAPI.getStockListByIdst(uid, name);
    res.status(200).json(stockList);
  } catch (error) {
    console.log(error);
  }
};
export const getInvestStockTop5 = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  try {
    const stockTop5 = await recencyAPI.getInvestStockTop5(uid);
    res.status(200).json(stockTop5);
  } catch (error) {
    console.log(error);
  }
};

export const getStockDetailListByStock = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const { name } = req.params;
  try {
    const stockList = await recencyAPI.getStockDetailListByStock(uid, name);
    res.status(200).json(stockList);
  } catch (error) {
    console.log(error);
  }
};
