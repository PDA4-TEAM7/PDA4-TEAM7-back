import { Portfolio } from "../models/portfolio";
import { Account } from "../models/account";
import { User } from "../models/user";
import { Request, Response } from "express";
import { getKSTNow } from "../utils/time";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock } from "../models/stock";

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
      return res.status(404).json({ message: "해당 포트폴리오가 존재하지 않습니다." });
    }

    const owner = portfolio.account.user;

    if (!owner) {
      return res.status(404).json({ message: "포트폴리오의 작성자가 존재하지 않습니다." });
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

export const createPortfolio = async (req: Request, res: Response) => {
  const { account_id, title, description, price, detailDescription } = req.body;

  try {
    // 사용자의 계정 정보를 가져옴
    const account = await Account.findByPk(account_id);

    if (!account) {
      return res.status(404).json({ message: "유저의 계좌 정보가 존재하지 않습니다." });
    }

    // 해당 계정에 이미 포트폴리오가 있는지 확인
    const existingPortfolio = await Portfolio.findOne({ where: { account_id: account.account_id } });
    if (existingPortfolio) {
      return res.status(409).json({ message: "이미 등록된 포트폴리오 정보 입니다." });
    }

    const kstNow = getKSTNow();
    // 포트폴리오 생성
    const newPortfolio = await Portfolio.create({
      account_id: account.account_id,
      title,
      description,
      price,
      detail_description: detailDescription,
      update_dt: kstNow,
      create_dt: kstNow,
      published: true,
    });

    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error("포트폴리오 생성 오류", error);
    res.status(500).send("포트폴리오 생성 오류");
  }
};

export const updatePortfolio = async (req: Request, res: Response) => {
  try {
    const { account_id } = req.params;
    const { published } = req.body;

    const portfolio = await Portfolio.findOne({ where: { account_id } });

    if (!portfolio) {
      return res.status(404).json({ message: "포트폴리오가 존재하지않습니다." });
    }

    portfolio.published = published;
    await portfolio.save();

    res.status(200).json({ message: "게시가 취소되었습니다." });
  } catch (error) {
    console.error("에러 : ", error);
    res.status(500).json({ message: "서버 에러입니다." });
  }
};

export const getPortfolioByAccountId = async (req: Request, res: Response) => {
  const { accountId } = req.params;

  try {
    const portfolio = await Portfolio.findOne({ where: { account_id: accountId } });

    if (!portfolio) {
      return res.status(404).json({ message: "포트폴리오가 존재하지 않습니다." });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio by account ID:", error);
    res.status(500).json({ message: "서버 에러입니다." });
  }
};

export const getAllPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.findAll({
      where: { published: true },
      include: [
        {
          model: Account,
          include: [User],
        },
      ],
    });

    const portfolioList = await Promise.all(
      portfolios.map(async (portfolio) => {
        const account = portfolio.account;
        const stocksInAccount = await Stock_in_account.findAll({ where: { account_id: account.account_id } });

        const totalQuantity = stocksInAccount.reduce((sum, stock) => sum + parseFloat(stock.hldg_qty || "0"), 0);
        const stockData = await Promise.all(
          stocksInAccount.map(async (stock) => {
            const stockInfo = await Stock.findOne({ where: { stock_id: stock.stock_id } });
            return {
              name: stockInfo?.name,
              ratio: parseFloat(stock.hldg_qty || "0") / totalQuantity,
            };
          })
        );

        return {
          id: portfolio.portfolio_id,
          account_id: portfolio.account_id,
          title: portfolio.title,
          price: portfolio.price,
          description: portfolio.description,
          createDate: portfolio.create_dt,
          username: account.user.username,
          totalAsset: parseFloat(account.evlu_amt_smtl_amt || "0"),
          profitLoss:
            (parseFloat(account.evlu_pfls_smtl_amt || "0") / parseFloat(account.pchs_amt_smtl_amt || "1")) * 100,
          loss: parseFloat(account.evlu_pfls_smtl_amt || "0"),
          stockData,
        };
      })
    );

    res.json(portfolioList);
  } catch (error) {
    console.error("Error fetching portfolio list:", error);
    res.status(500).send("Error fetching portfolio list");
  }
};
