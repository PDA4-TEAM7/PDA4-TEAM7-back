import { Comment } from "../models/comment";
import { Portfolio } from "../models/portfolio";
import { User } from "../models/user";
import { Request, Response } from "express";

export const writeComment = async (req: Request, res: Response) => {
  const { description, dummyUserId, dummyPortfolioId } = req.body;

  // 더미 값
  // const dummyUserId = 1;
  // const dummyPortfolioId = 2;

  try {
    // 더미 포트폴리오와 유저가 실제로 존재하는지 확인 (테스트 데이터)
    const user = await User.findByPk(dummyUserId);
    const portfolio = await Portfolio.findByPk(dummyPortfolioId);

    if (!user || !portfolio) {
      return res
        .status(404)
        .json({ message: "해당 포트폴리오나 유저가 없습니다." });
    }

    const newComment = await Comment.create({
      portfolio_id: dummyPortfolioId,
      user_id: dummyUserId,
      description: description,
      create_dt: new Date(),
    });

    res.status(201).json({ message: "댓글 작성 완료", newComment });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
