import express from "express";
import { Trading_history } from "../models/trading_history"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";

export const tradingHistory = async (req: Request, res: Response) => {
  const { account_id } = req.body;

  try {
    const tradingHistory = await Trading_history.findAll({
      where: { account_id: account_id },
      attributes: [
        "trading_id",
        "account_id",
        "stock_id",
        "sll_buy_dvsn_cd",
        "trade_dt",
        "tot_ccld_qty",
        "tot_ccld_amt",
      ],
    });
    res.json(tradingHistory);
  } catch (error) {
    console.error("Error fetching trading History:", error);
    res.status(500).send("Error fetching trading History");
  }
};
