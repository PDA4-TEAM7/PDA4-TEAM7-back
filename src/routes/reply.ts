import express from "express";
import {
  deleteReply,
  readReply,
  writeReply,
  updateReply,
} from "../controllers/reply";

import requireAuthMiddleware from "../middleware/requireAuthMiddleware";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/reply/write", requireAuthMiddleware, writeReply);

  router.get("/reply/read/:comment_id", readReply);

  router.delete("/reply/delete/:reply_id", requireAuthMiddleware, deleteReply);

  router.patch("/reply/update/:reply_id", requireAuthMiddleware, updateReply);
};
