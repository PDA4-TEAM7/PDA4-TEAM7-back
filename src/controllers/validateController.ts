import { Request, Response } from 'express';
import validateAPI from '../services/validateAPI';

class validateController {
    // 아이디 중복 확인
    static async checkUserIdAvailability(req: Request, res: Response) {
        try {
            const { user_id } = req.body;
            const isAvailable = await validateAPI.checkUserIdAvailability(user_id as string);
            return res.status(200).json({ available: isAvailable });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default validateController;
