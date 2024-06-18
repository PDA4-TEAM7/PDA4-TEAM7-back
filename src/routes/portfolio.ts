import express from "express";
// import { deleteComment, readComment, writeComment } from "../controllers/comment";

import { portFolio } from "../controllers/portFolioAPI";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/portFolio", portFolio);
};
