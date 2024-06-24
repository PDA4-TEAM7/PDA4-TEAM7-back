import express from "express";
import { getUserInfo, setCharge, setPassword, setUserInfo, getUserCredit } from "../controllers/user";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";
export default (router: express.Router) => {
  router.get("/user/me", requireAuthMiddleware, getUserInfo);
  router.post("/user", setUserInfo);
  router.post("/user/charge", setCharge);
  router.post("/user/password", setPassword);
};
