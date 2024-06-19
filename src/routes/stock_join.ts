import express from "express";
// import { deleteComment, readComment, writeComment } from "../controllers/comment";

import { stockJoin } from "../controllers/stockJoinAPI";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/stockjoin", stockJoin);
};
