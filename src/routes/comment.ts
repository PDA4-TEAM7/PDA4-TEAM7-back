import express from "express";
import {
  deleteComment,
  readComment,
  writeComment,
  updateComment,
} from "../controllers/comment";

import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/comment/write", requireAuthMiddleware, writeComment); //여기에 authMiddleware넣으면 에러나올거임. 401뜨는거 보니까 토큰 값 제대로 제공 못받는 듯

  router.get("/comment/read/:portfolio_id", readComment);

  router.delete(
    "/comment/delete/:comment_id",
    requireAuthMiddleware,
    deleteComment
  );

  router.patch(
    "/comment/update/:comment_id",
    requireAuthMiddleware,
    updateComment
  );
};
