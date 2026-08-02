import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Brak autoryzacji." });
  }

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as { uid: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Nieprawidłowy lub przeterminowany token." });
  }
};
