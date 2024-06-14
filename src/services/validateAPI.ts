import { User } from '../models/user';

class validateAPI {
    // 아이디 중복 검사
    static async checkUserIdAvailability(user_id: string): Promise<boolean> {
        const user = await User.findOne({
            where: { user_id: user_id },
        });
        return !user;
    }

    static async checkUsernameAvailability(username: string): Promise<boolean> {
        const user = await User.findOne({
            where: { username: username },
        });
        return !user;
    }
}

export default validateAPI;
