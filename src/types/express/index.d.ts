import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; username: string };
    }
  }
}
