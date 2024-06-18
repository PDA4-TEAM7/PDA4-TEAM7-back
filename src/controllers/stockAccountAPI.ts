import express from "express";
import { Stock_in_account } from "../models/stock_in_account"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";

export const stockAccount = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const stockAccount = await Stock_in_account.findAll({
      attributes: [
        "holdings_id",
        "account_id",
        "stock_id",
        "market_id",
        "quantity",
        "pchs_amt",
        "evlu_amt",
        "evlu_pfls_amt",
        "evlu_pfls_rt",
      ],
    });
    res.json(stockAccount);
  } catch (error) {
    console.error("Error fetching stock account:", error);
    res.status(500).send("Error fetching stock account");
  }
};
