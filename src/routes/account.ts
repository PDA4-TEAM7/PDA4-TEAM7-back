import express from "express";
import { setAccount, getAccount, getMyAccountList, deleteAccount, getTradingHistory } from "../controllers/account";

export default (router: express.Router) => {
  //account추가
  router.post("/account", setAccount);
  router.get("/account/:accountId", getAccount);
  router.get("/accountlist", getMyAccountList);
  router.delete("/account/:accountId", deleteAccount);
  router.get("/account/trading/:accountId", getTradingHistory);
};
