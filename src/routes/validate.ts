import express from 'express';
import { checkUserIdAvailability, checkUsernameAvailability } from '../controllers/validate';
export default (router: express.Router) => {
    router.post('/validate/check-userid', checkUserIdAvailability);
    router.post('/validate/check-username', checkUsernameAvailability);
};
