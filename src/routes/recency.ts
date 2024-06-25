import express from "express";
import {
  updateAllHoldings,
  updateAllHistory,
  getMySubRecencyTradingHistory,
  getStockInfoByAccountId,
} from "../controllers/recency";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  router.get("/recency/updateAllHoldings", updateAllHoldings);
  router.get("/recency/updateAllHistory", updateAllHistory);
  router.get("/recency/getMyRecencyTradingHistory", getMySubRecencyTradingHistory);
  router.get("/recency/getStockInfo/:accountId/:name", getStockInfoByAccountId);
};
