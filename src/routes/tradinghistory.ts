import express from "express";
import { tradingHistory } from "../controllers/tradeHistoryAPI";

export default (router: express.Router) => {
  router.get("/tradinghistory/:accountId", tradingHistory);
};
