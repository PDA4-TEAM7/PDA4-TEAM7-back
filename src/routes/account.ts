import express from "express";
import { setAccount } from "../controllers/account";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/account", setAccount);
};
