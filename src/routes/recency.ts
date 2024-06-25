import express from "express";
import { updateAllHoldings, updateAllHistory } from "../controllers/recency";

export default (router: express.Router) => {
  router.get("/recency/updateAllHoldings", updateAllHoldings);
  router.get("/recency/updateAllHistory", updateAllHistory);
};
