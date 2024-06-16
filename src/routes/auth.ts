import express from "express";
import { signUp, signIn } from "../controllers/auth";
export default (router: express.Router) => {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
};
