import { Request, Response, NextFunction } from "express";

const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req as any).user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  next();
};

export default requireAuthMiddleware;
