import { Request, Response } from "express";
import authAPI, { IAuth } from "../services/authAPI";
import validateAPI from "../services/validateAPI";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { user_id, username, password, confirm_password } = req.body;
    const [isUserIdAvailable, isUsernameAvailable] = await Promise.all([
      validateAPI.checkUserIdAvailability(user_id as string),
      validateAPI.checkUsernameAvailability(username as string),
    ]);

    if (!isUserIdAvailable) {
      return res.json({ message: "이미 사용중인 사용자 ID입니다." });
    }
    if (!isUsernameAvailable) {
      return res.json({ message: "이미 사용중인 사용자명입니다." });
    }
    const user = await authAPI.signUp({ user_id, username, password, confirm_password });

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username }, // 사용자 식별 정보 포함
      JWT_SECRET,
      { expiresIn: "1h" } // 유효 시간 설정
    );


    res.cookie("token", token, {
      httpOnly: true, // 쿠키를 HTTP(S) 통신에서만 사용
      // secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서는 HTTPS 통신만 허용
      secure: true,
      sameSite: "strict", // CSRF 공격 방지
    });

    return res.status(200).json({ user: user, message: "회원가입 성공!" });
  } catch (error) {
    res.status(500).json({ message: "회원가입 실패!", error: error });
    console.error(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { user_id, password } = req.body;
    const user = await authAPI.signIn(user_id, password);

    if (!user) {
      return res.status(401).json({ message: "로그인 실패: 사용자명 또는 비밀번호가 잘못되었습니다." });
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username }, // 사용자 식별 정보 포함
      JWT_SECRET,
      { expiresIn: "1h" } // 토큰 유효 시간 설정
    );

    res.cookie("token", token, {
      httpOnly: true, // 쿠키를 HTTP(S) 통신에서만 사용
      secure: true, // HTTPS 통신에서만 쿠키 사용
      sameSite: "strict", // CSRF 공격 방지
    });

    return res.status(200).json({ user: user, message: "로그인 성공!" });
  } catch (error) {
    res.status(500).json({ message: "로그인 처리 중 문제가 발생했습니다.", error });
  }
};


export const signOut = (req: Request, res: Response) => {
  const { cookieOptions } = authAPI.clearAuthentication();
  res.cookie("token", "", cookieOptions);
  return res.status(200).json({ message: "로그아웃 성공!" });
};

