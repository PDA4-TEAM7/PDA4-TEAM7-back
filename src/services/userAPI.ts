import { User } from "../models/user";
export interface UserInfoResponse {
  uid?: number;
  user_id?: string;
  username?: string;
  password?: string;
  credit?: number;
  introduce?: string;
}
class UserAPI {
  static async getUserInfo(uid: number): Promise<UserInfoResponse | null> {
    try {
      const user = await User.findByPk(uid);
      if (!user) {
        return null;
      }
      return {
        uid: user.uid,
        user_id: user.user_id,
        username: user.username,
        password: user.password,
        credit: user.credit,
        introduce: user.introduce,
      };
    } catch (error) {
      throw new Error("유저를 찾을 수가 없습니다.");
    }
  }
}
export default UserAPI;
