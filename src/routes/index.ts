import express from 'express';
import account from './account';
import comment from './comment';
import validate from './validate';
const router = express.Router();

export default (): express.Router => {
    account(router);
    comment(router);
    validate(router);
    return router;
};
////하나로 묶어준뒤 경로에 따라서 요청이 나감.
