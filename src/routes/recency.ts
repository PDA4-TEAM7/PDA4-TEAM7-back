import express from "express";
import {
  updateAllHoldings,
  updateAllHistory,
  getMySubRecencyTradingHistory,
  getStockInfoByAccountId,
  getInvestIdstTop5,
  getStockListByIdst,
  getInvestStockTop5,
  getStockDetailListByStock,
} from "../controllers/recency";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  router.get("/recency/updateAllHoldings", updateAllHoldings);
  router.get("/recency/updateAllHistory", updateAllHistory);
  router.get("/recency/getMyRecencyTradingHistory", getMySubRecencyTradingHistory);
  router.get("/recency/getStockInfo/:accountId/:name", getStockInfoByAccountId);
  router.get("/recency/getInvestIdstTop5", getInvestIdstTop5);
  router.get("/recency/getStockList/:name", getStockListByIdst);
  router.get("/recency/getInvestStockTop5", getInvestStockTop5);
  router.get("/recency/getStockDetailList/:name", getStockDetailListByStock);
};
