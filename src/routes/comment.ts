import express from "express";
import { deleteComment, readComment, writeComment,updateComment } from "../controllers/comment";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/comment/write", writeComment);

  router.get("/comment/read/:portfolio_id", readComment)

  router.delete("/comment/delete/:comment_id",deleteComment)

  router.patch("/comment/update/:comment_id",updateComment)
};
