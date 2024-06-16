import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // 타입 단언문을 사용하여 decoded payload를 req.user에 저장
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res
      .status(401)
      .json({ message: "Invalid token.", error: (error as Error).message });
  }
};

export default authMiddleware;
