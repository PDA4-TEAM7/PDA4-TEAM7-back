import express from "express";
import requireAuthMiddleware from "../middleware/requireAuthMiddleware";
import { signUp, signIn, signOut, isLogin } from "../controllers/auth";
export default (router: express.Router) => {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", requireAuthMiddleware, signOut);
  router.post("/auth/islogin", requireAuthMiddleware, isLogin);
};
