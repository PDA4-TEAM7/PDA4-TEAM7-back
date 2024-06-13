import express from "express";
// import account from "./account";
//router
// import CommentRouter from "./routes/api/comment";
import comment from "./comment";

const router = express.Router();

export default (): express.Router => {
  // account(router);
  comment(router);
  return router;
};
////하나로 묶어준뒤 경로에 따라서 요청이 나감.
