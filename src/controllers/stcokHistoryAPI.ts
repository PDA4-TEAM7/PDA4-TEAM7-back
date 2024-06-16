import express from "express";
import { Stock_history } from "../models/stock_history"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";

export const stockhistory = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const stockhistory = await Stock_history.findAll({
      attributes: [
        "id",
        "stock_id",
        "market_id",
        "now_price",
        "closing_price",
        "update_dt",
      ],
    });
    res.json(stockhistory);
  } catch (error) {
    console.error("Error fetching stock list:", error);
    res.status(500).send("Error fetching stock list");
  }
};
