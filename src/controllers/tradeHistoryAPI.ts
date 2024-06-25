import { Trading_history } from "../models/trading_history"; // 모델 파일 경로에 맞게 수정
import { Request, Response } from "express";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock } from "../models/stock";

export const tradingHistory = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  try {
    const tradingHistory = await Trading_history.findAll({
      include: [
        {
          model: Stock,
          required: true,
        },
      ],
      where: { account_id: accountId },
    });

    console.log(tradingHistory);
    res.json(tradingHistory);
  } catch (error) {
    console.error("Error fetching trading History:", error);
    res.status(500).send("Error fetching trading History");
  }
};
