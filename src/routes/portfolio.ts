import express from "express";
import { portfolio, getPortfolioOwner, createPortfolio } from "../controllers/portfolioAPI";

export default (router: express.Router) => {
  router.post("/portFolio", portfolio);

  //portfolio id를 통해서 작성자 찾기
  router.get("/portfolio/user/:portfolioId", getPortfolioOwner);
  router.post("/portfolio/add", createPortfolio);
};
