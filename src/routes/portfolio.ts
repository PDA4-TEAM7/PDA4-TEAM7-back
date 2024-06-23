import express from "express";
import {
  portfolio,
  getPortfolioOwner,
  createPortfolio,
  updatePortfolio,
  getPortfolioByAccountId,
  getAllPortfolios,
} from "../controllers/portfolioAPI";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  router.post("/portfolio", portfolio);

  //portfolio id를 통해서 작성자 찾기
  router.get("/portfolio/user/:portfolioId", getPortfolioOwner);
  router.post("/portfolio/add", requireAuthMiddleware, createPortfolio);
  router.patch("/portfolio/:account_id", requireAuthMiddleware, updatePortfolio);
  router.get("/portfolio/account/:accountId", requireAuthMiddleware, getPortfolioByAccountId);
  router.get("/portfolios", getAllPortfolios);
};
