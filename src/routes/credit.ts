import express, { Router } from "express";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";
import { getMyCredit } from "../controllers/credit";
export default (router: Router) => {
  router.get("/credit", requireAuthMiddleware, getMyCredit);
};
