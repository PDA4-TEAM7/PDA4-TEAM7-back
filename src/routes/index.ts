import express from "express";
import account from "./account";
import comment from "./comment";
import validate from "./validate";
import stock from "./stock";
import stock_account from "./stock_account";
import stockhistory from "./stockhistory";
import stock_join from "./stock_join";
import reply from "./reply";
import auth from "./auth";
import user from "./user";
import portfolio from "./portfolio";
import backtest from "./backtest";
import tradinghistory from "./tradinghistory";
import subscribe from "./subscribe";
const router = express.Router();

export default (): express.Router => {
  account(router);
  comment(router);
  reply(router);
  stock(router);
  stock_account(router);
  stockhistory(router);
  stock_join(router);
  validate(router);
  auth(router);
  user(router);
  portfolio(router);
  backtest(router);
  tradinghistory(router);
  subscribe(router);

  return router;
};
////하나로 묶어준뒤 경로에 따라서 요청이 나감.
