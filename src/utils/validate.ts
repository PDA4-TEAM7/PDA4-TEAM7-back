import express from 'express';

import { checkUserIdAvailability } from '../controllers/validate';

export default (router: express.Router) => {
    router.post('/check-userid', checkUserIdAvailability);
};
