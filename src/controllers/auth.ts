import { Request, Response } from "express";
import authAPI, { IAuth } from "../services/authAPI";
import validateAPI from "../services/validateAPI";

export const signUp = async (req: Request, res: Response) => {
  try {
    const auth = req.body;

    const [isUserIdAvailable, isUsernameAvailable] = await Promise.all([
      validateAPI.checkUserIdAvailability(auth.user_id),
      validateAPI.checkUsernameAvailability(auth.username),
    ]);
    if (!isUserIdAvailable) {
      return res.status(409).json({ message: "이미 사용중인 사용자 ID입니다." });
    }
    if (!isUsernameAvailable) {
      return res.status(409).json({ message: "이미 사용중인 사용자명입니다." });
    }

    const user = await authAPI.signUp(auth);
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "회원가입 실패", error: error });
    console.error(error);
  }
};
