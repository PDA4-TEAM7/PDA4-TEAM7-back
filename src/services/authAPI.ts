import { User } from "../models/user";
import bcrypt from "bcrypt";
export interface IAuth {
  user_id: string;
  username: string;
  password: string;
  confirm_password: string;
}
interface UserSignUpResponse {
  uid: number;
  user_id: string;
  username: string;
}

interface UserSignInResponse {
  uid: number;
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

      if (newUser.uid === undefined || newUser.user_id === undefined || newUser.username === undefined) {
        throw new Error("사용자 정보가 충분하지 않습니다.");
      }

      return {
        uid: newUser.uid,
        user_id: newUser.user_id,
        username: newUser.username,
      };
    } catch (error) {
      throw new Error("회원가입 처리 중 오류가 발생했습니다.");
    }
  }

  static async signIn(user_id: string, password: string): Promise<UserSignInResponse> {
    const user = await User.findOne({ where: { user_id: user_id } });

    if (!user || !user.uid || !user.password || !user.user_id || !user.username) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    return {
      uid: user.uid,
      user_id: user.user_id,
      username: user.username,
    };
  }

  static clearAuthentication = () => {
    return {
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: "strict" as "strict",
        expires: new Date(0),
      },
    };
  };
}

export default AuthAPI;
