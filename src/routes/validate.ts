import express from 'express';
import validateController from '../controllers/validateController';

const router = express.Router();

router.post('/check-userid', validateController.checkUserIdAvailability);

export default router;
