import express from 'express';

import validateController from '../controllers/validateController';

export default (router: express.Router) => {
    router.post('/check-userid', validateController.checkUserIdAvailability);
};
