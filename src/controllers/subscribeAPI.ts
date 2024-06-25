import { Request, Response } from "express";
import { Sub_portfolio } from "../models/sub_portfolio";
import { Portfolio } from "../models/portfolio";
import { User } from "../models/user";
import { Account } from "../models/account";
import { Stock_in_account } from "../models/stock_in_account";
import { Stock } from "../models/stock";

export const subscribePortfolio = async (req: Request, res: Response) => {
  const { portfolio_id } = req.body;
  const { uid } = (req as any).user;

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findByPk(uid);
    const portfolio = await Portfolio.findByPk(portfolio_id);

    if (!user || !portfolio) {
      return res.status(404).json({ message: "User or Portfolio not found" });
    }

    const userCredit = user.credit ?? 0;
    const portfolioPrice = portfolio.price ?? 0;

    if (userCredit < portfolioPrice) {
      return res.status(400).json({ message: "Insufficient credit" });
    }

    user.credit = userCredit - portfolioPrice;
    await user.save();

    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    let subscription = await Sub_portfolio.findOne({ where: { portfolio_id, uid } });

    if (subscription) {
      subscription.can_sub = true;
      subscription.st_dt = today;
      subscription.ed_dt = oneMonthLater;
    } else {
      subscription = await Sub_portfolio.create({
        portfolio_id,
        uid,
        st_dt: today,
        ed_dt: oneMonthLater,
        can_sub: true,
      });
    }

    await subscription.save();

    res.status(201).json(subscription);
  } catch (error) {
    console.error("Error subscribing to portfolio:", error);
    res.status(500).json({ message: "Error subscribing to portfolio" });
  }
};

export const unsubscribePortfolio = async (req: Request, res: Response) => {
  const { portfolio_id } = req.body;
  const { uid } = (req as any).user; // Assuming req.user is populated by authentication middleware

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const subscription = await Sub_portfolio.findOne({ where: { portfolio_id, uid } });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.can_sub = false;
    await subscription.save();

    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error unsubscribing from portfolio:", error);
    res.status(500).json({ message: "Error unsubscribing from portfolio" });
  }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  const { uid } = (req as any).user; // Assuming req.user is populated by authentication middleware

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const subscriptions = await Sub_portfolio.findAll({
      where: { uid, can_sub: true },
      include: [
        {
          model: Portfolio,
          include: [
            {
              model: Account,
              include: [User],
            },
          ],
        },
      ],
    });

    const response = await Promise.all(
      subscriptions.map(async (subscription) => {
        const portfolio = subscription.portfolio;
        const account = portfolio.account;
        const user = account.user;
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
          portfolio_id: portfolio.portfolio_id,
          title: portfolio.title,
          description: portfolio.description,
          account_id: portfolio.account_id,
          createDate: portfolio.create_dt,
          username: user.username,
          totalAsset: parseFloat(account.evlu_amt_smtl_amt || "0"),
          profitLoss:
            (parseFloat(account.evlu_pfls_smtl_amt || "0") / parseFloat(account.pchs_amt_smtl_amt || "1")) * 100,
          loss: parseFloat(account.evlu_pfls_smtl_amt || "0"),
          stockData,
          ed_dt: subscription.ed_dt,
        };
      })
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
};

export const getSubscriberCount = async (req: Request, res: Response) => {
  const portfolioId = req.params.portfolio_id;
  const subscriberCount = await Sub_portfolio.count({
    where: {
      portfolio_id: portfolioId,
      can_sub: 1,
    },
  });

  res.status(200).json({ subscriberCount });
};
