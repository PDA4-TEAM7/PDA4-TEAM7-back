import { User } from "../models/user";

class validateAPI {
  // 아이디 중복 검사
  static async checkUserIdAvailability(user_id: string): Promise<boolean> {
    console.log("checkIn", user_id);
    if (!user_id || user_id.trim() === "") {
      return false;
    }
    const user = await User.findOne({
      where: { user_id: user_id },
    });
    return user === null ? true : false;
  }

  static async checkUsernameAvailability(username: string): Promise<boolean> {
    if (!username || username.trim() === "") {
      return false;
    }
    const user = await User.findOne({
      where: { username: username },
    });

    return user === null ? true : false;
  }
}

export default validateAPI;
