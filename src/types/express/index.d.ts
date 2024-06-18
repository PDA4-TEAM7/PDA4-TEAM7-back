import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: { uid: number; username: string; user_id: string };
    }
  }
}
