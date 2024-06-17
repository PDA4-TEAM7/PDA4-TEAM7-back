import express from "express";
import { setAccount, getAccount, getAccountList, deleteAccount } from "../controllers/account";

export default (router: express.Router) => {
  //account추가
  router.post("/account", setAccount);
  router.get("/account/:accountId", getAccount);
  router.get("/accountList", getAccountList);
  router.delete("/account/:accountId", deleteAccount);
};
