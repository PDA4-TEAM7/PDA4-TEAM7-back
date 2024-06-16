import express from "express";
// import { deleteComment, readComment, writeComment } from "../controllers/comment";

import { stockhistory } from "../controllers/stcokHistoryAPI";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/stockhistory", stockhistory);
};
