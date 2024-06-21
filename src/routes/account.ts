import express from "express";
import { setAccount, getAccount, getMyAccountList, deleteAccount } from "../controllers/account";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  //account추가
  router.post("/account", requireAuthMiddleware, setAccount);
  router.get("/account/:accountId", getAccount);
  router.get("/accountlist", requireAuthMiddleware, getMyAccountList);
  router.delete("/account/:accountId", requireAuthMiddleware, deleteAccount);
};
