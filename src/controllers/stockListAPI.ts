import express from "express";
import { Stock } from "../models/stock"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";

export const stockList = async (req: Request, res: Response) => {
  const { sector, name } = req.body;

  try {
    const stockList = await Stock.findAll({
      where: name ? { name } : {}, // name이 있으면 필터링, 없으면 모든 항목 가져오기
      attributes: [
        "stock_id",
        "market_id",
        "name",
        "code",
        "listing_dt",
        "delisting_dt",
        "listing",
        "std_idst_clsf_cd_name",
      ],
    });

    res.json(stockList);
  } catch (error) {
    console.error("Error fetching stock list:", error);
    res.status(500).send("Error fetching stock list");
  }
};
