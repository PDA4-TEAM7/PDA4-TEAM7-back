import express from "express";
import { Stock_in_account } from "../models/stock_in_account"; // 모델 파일 경로에 맞게 수정
import { Stock } from "../models/stock"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";
export const stockJoin = async (req: Request, res: Response) => {
  const { account_id } = req.body;

  try {
    const stockJoin = await Stock_in_account.findAll({
      where: { account_id: account_id },
      include: [
        {
          model: Stock,
          attributes: ["name", "std_idst_clsf_cd_name"],
        },
      ],
      attributes: [
        "holdings_id",
        "account_id",
        "stock_id",
        "market_id",
        "hldg_qty",
        "pchs_amt",
        "evlu_amt",
        "evlu_pfls_amt",
        "evlu_pfls_rt",
      ],
    });
    res.json(stockJoin);
  } catch (error) {
    console.error("해당 주식의 이름, 표준산업 코드명과 계좌 정보를 가져올 수 없습니다.:", error);
    res.status(500).send("해당 주식의 이름, 표준산업 코드명과 계좌 정보를 가져올 수 없습니다.");
  }
};
