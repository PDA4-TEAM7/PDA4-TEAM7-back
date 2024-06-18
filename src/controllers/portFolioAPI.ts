import express from "express";
import { Portfolio } from "../models/portfolio"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";

export const portFolio = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const portfolioList = await Portfolio.findAll({
      attributes: [
        "portfolio_id",
        "account_id",
        "published",
        "price",
        "update_dt",
        "create_dt",
        "title",
        "description",
        "detail_description",
      ],
    });
    res.json(portfolioList);
  } catch (error) {
    console.error("Error fetching stock list:", error);
    res.status(500).send("Error fetching stock list");
  }
};
