import express from "express";
import { signUp } from "../controllers/auth";
export default (router: express.Router) => {
  router.post("/auth/signup", signUp);
};
