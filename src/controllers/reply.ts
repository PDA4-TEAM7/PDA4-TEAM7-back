import { Comment } from "../models/comment";
import { Portfolio } from "../models/portfolio";
import { User } from "../models/user";
import { Reply } from "../models/reply";
import { Request, Response } from "express";
import { Account } from "../models/account";
import { getKSTNow } from "../utils/time";

export const writeReply = async (req: Request, res: Response) => {
  const { description, comment_id, userId } = req.body;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const portfolio = await Portfolio.findByPk(comment.portfolio_id);
    if (!portfolio) {
      return res
        .status(404)
        .json({ message: "포트폴리오를 찾을 수 없습니다." });
    }

    const account = await Account.findByPk(portfolio.account_id);
    if (!account) {
      return res.status(404).json({ message: "계정을 찾을 수 없습니다." });
    }

    if (account.uid !== userId) {
      return res
        .status(403)
        .json({ message: "포트폴리오 작성자만 답글을 달 수 있습니다." });
    }

    const kstNow = getKSTNow();
    const newReply = await Reply.create({
      comment_id,
      user_id: userId, // 포트폴리오 작성자의 ID
      description,
      create_dt: kstNow,
    });

    const user = await User.findByPk(userId);

    res.status(201).json({
      message: "답글 작성 완료",
      newReply: {
        reply_id: newReply.reply_id,
        comment_id: newReply.comment_id,
        user_id: newReply.user_id,
        description: newReply.description,
        create_dt: newReply.create_dt,
        username: user?.username, // 답글 작성자의 이름
      },
    });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const readReply = async (req: Request, res: Response) => {
  const { comment_id } = req.params;

  try {
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const replies = await Reply.findAll({
      where: { comment_id },
      attributes: ["description", "create_dt", "user_id"], // 가져올 답글 정보
    });

    const formattedReplies = await Promise.all(
      replies.map(async (reply) => {
        const user = await User.findByPk(reply.user_id);
        return {
          author: user?.username, // 답글 작성자의 이름
          user_id: reply.user_id, // 답글 작성자의 ID
          description: reply.description,
          create_dt: reply.create_dt,
        };
      })
    );

    res.status(200).json({ replies: formattedReplies });
  } catch (error) {
    console.error("Error reading replies:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteReply = async (req: Request, res: Response) => {
  const { reply_id } = req.params;

  try {
    const reply = await Reply.findByPk(reply_id);
    if (!reply) {
      return res.status(404).json({ message: "답글이 존재하지 않습니다." });
    }

    await reply.destroy();
    res.status(200).json({ message: "답글이 삭제되었습니다." });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateReply = async (req: Request, res: Response) => {
  const { reply_id } = req.params;
  const { description } = req.body;

  try {
    const reply = await Reply.findByPk(reply_id);
    if (!reply) {
      return res.status(404).json({ message: "답글이 존재하지 않습니다." });
    }

    const kstNow = getKSTNow();
    // 업데이트 할 데이터 설정
    reply.description = description;
    reply.update_dt = kstNow;
    reply.is_update = true;

    await reply.save();
    res.status(200).json({ message: "답글이 업데이트되었습니다.", reply });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
