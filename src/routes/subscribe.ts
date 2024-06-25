import express from "express";
import {
  subscribePortfolio,
  unsubscribePortfolio,
  getUserSubscriptions,
  getSubscriberCount,
} from "../controllers/subscribeAPI";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  router.post("/subscribe", requireAuthMiddleware, subscribePortfolio);
  router.post("/unsubscribe", requireAuthMiddleware, unsubscribePortfolio);
  router.get("/subscriptions", requireAuthMiddleware, getUserSubscriptions);
  router.get("/subscriber/count/:portfolio_id", getSubscriberCount);
};
