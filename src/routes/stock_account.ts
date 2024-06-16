import express from "express";
// import { deleteComment, readComment, writeComment } from "../controllers/comment";

import { stockAccount } from "../controllers/stockAccountAPI";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/stockaccount", stockAccount);
};
