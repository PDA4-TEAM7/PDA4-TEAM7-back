import { Request, Response } from 'express';
import validateAPI from '../services/validateAPI';

export const checkUserIdAvailability = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const isAvailable = await validateAPI.checkUserIdAvailability(user_id as string);
        return res.status(200).json({ available: isAvailable });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const checkUsernameAvailability = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const isAvailable = await validateAPI.checkUsernameAvailability(username as string);
        return res.status(200).json({ available: isAvailable });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
