import { User } from "../models/user";
export interface IAuth {
  user_id: string;
  username: string;
  password: string;
  confirm_password: string;
}
interface UserSignUpResponse {
  user_id: string;
  username: string;
}
class AuthAPI {
  static async signUp(auth: IAuth): Promise<UserSignUpResponse> {
    if (auth.password !== auth.confirm_password) {
      throw new Error("동일한 비밀번호를 입력해주세요");
    }
    try {
      const newUser = await User.create(auth);

      if (newUser.user_id === undefined || newUser.username === undefined) {
        throw new Error("사용자 정보가 충분하지 않습니다.");
      }

      return {
        user_id: newUser.user_id,
        username: newUser.username,
      };
    } catch (error) {
      throw new Error("회원가입 처리 중 오류가 발생했습니다.");
    }
  }
}

export default AuthAPI;
