import express from "express";
import { updateAllHoldings } from "../controllers/recency";

export default (router: express.Router) => {
  router.get("/recency/updateAllHoldings", updateAllHoldings);
};
