import express from "express";
import { signUp, signIn, signOut } from "../controllers/auth";
export default (router: express.Router) => {
  router.post("/auth/signup", signUp);
  router.post("/auth/signin", signIn);
  router.post("/auth/signout", signOut);
};
