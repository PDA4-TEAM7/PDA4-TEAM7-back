import express from "express";
import {
  portfolio,
  getPortfolioOwner,
  createPortfolio,
  updatePortfolio,
  getPortfolioByAccountId,
  getAllPortfolios,
  getPortfolioDetails,
  getPortfolio,
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
  router.get("/portfolio/comm/:accountId", requireAuthMiddleware, getPortfolioDetails);
  router.get("/portfolio/pid/:portfolioId", requireAuthMiddleware, getPortfolio);
};
