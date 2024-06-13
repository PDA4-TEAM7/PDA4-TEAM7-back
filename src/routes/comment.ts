import express from "express";
import { deleteComment, readComment, writeComment } from "../controllers/comment";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/comment/write", writeComment);

  router.get("/comment/read/:portfolio_id", readComment)

  router.get("/comment/delete/:comment_id",deleteComment)
};
