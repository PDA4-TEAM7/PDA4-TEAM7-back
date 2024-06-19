import { Portfolio } from "../models/portfolio";
import { Account } from "../models/account";
import { User } from "../models/user";
import { Request, Response } from "express";

export const portfolio = async (req: Request, res: Response) => {
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
    console.error("Error fetching portfolio list:", error);
    res.status(500).send("Error fetching portfolio list");
  }
};

export const getPortfolioOwner = async (req: Request, res: Response) => {
  const { portfolioId } = req.params;

  try {
    const portfolio = await Portfolio.findByPk(portfolioId, {
      include: [{ model: Account, include: [User] }],
    });

    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "해당 포트폴리오가 존재하지 않습니다." });
    }

    const owner = portfolio.account.user;

    if (!owner) {
      return res
        .status(404)
        .json({ message: "포트폴리오의 작성자가 존재하지 않습니다." });
    }

    const ownerInfo = {
      name: owner.username,
      uid: owner.uid,
      updateDate: portfolio.update_dt?.toISOString().split("T")[0] || "N/A",
      profileImage: "/img/soya_profile.png", // 프로필 이미지 하드코딩으로 고정 시켜 놓음.
    };

    res.status(200).json(ownerInfo);
  } catch (error) {
    console.error("Error fetching portfolio owner:", error);

    if (error instanceof Error) {
      console.error("Detailed error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};
