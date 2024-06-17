import express from "express";
import { getUserInfo } from "../controllers/user";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";
export default (router: express.Router) => {
  router.get("/user/me", requireAuthMiddleware, getUserInfo);
};
