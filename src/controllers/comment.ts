import { Comment } from "../models/comment";
import { Portfolio } from "../models/portfolio";
import { User } from "../models/user";
import { Request, Response } from "express";
import { getKSTNow } from "../utils/time";

export const writeComment = async (req: Request, res: Response) => {
  const { description, portfolioId } = req.body;
  // 로그인유저 아니면 에러임
  if (!req.user) return res.status(403).json({ message: "로그인 하세요" });
  const { uid, username } = req.user; // req.user에서 uid와 username 가져오기

  try {
    const user = await User.findByPk(uid);
    const portfolio = await Portfolio.findByPk(portfolioId);

    if (!user || !portfolio) {
      return res.status(404).json({ message: "해당 포트폴리오나 유저가 없습니다." });
    }

    const kstNow = getKSTNow();

    const newComment = await Comment.create({
      portfolio_id: portfolioId,
      user_id: user.uid,
      description: description,
      create_dt: kstNow,
    });

    const createdComment = await Comment.findOne({
      where: { comment_id: newComment.comment_id },
      include: [
        {
          model: User,
          attributes: ["username", "uid"],
        },
      ],
    });

    res.status(201).json({ message: "댓글 작성 완료", newComment: createdComment });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment 읽기 API
export const readComment = async (req: Request, res: Response) => {
  const { portfolio_id } = req.params;

  try {
    const portfolio = await Portfolio.findByPk(portfolio_id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const comments = await Comment.findAll({
      where: { portfolio_id },
      include: [
        {
          model: User,
          attributes: ["username", "uid"], // 가져올 사용자 정보
        },
      ],
      attributes: ["comment_id", "description", "create_dt", "user_id"], // 가져올 댓글 정보에 comment_id 추가
    });

    const formattedComments = comments.map((comment) => ({
      comment_id: comment.comment_id, // comment_id 추가
      author: comment.user.username,
      user_id: comment.user.uid,
      description: comment.description,
      create_dt: comment.create_dt,
    }));

    res.status(200).json({ comments: formattedComments });
  } catch (error) {
    console.error("Error reading comments:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment 삭제 API
export const deleteComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    await comment.destroy();
    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error("에러발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment 업데이트 API
export const updateComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { description } = req.body;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    const kstNow = getKSTNow();

    // 업데이트 할 데이터 설정
    comment.description = description;
    comment.update_dt = kstNow;
    comment.is_update = true;

    await comment.save();
    res.status(200).json({ message: "댓글이 업데이트되었습니다.", comment });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
