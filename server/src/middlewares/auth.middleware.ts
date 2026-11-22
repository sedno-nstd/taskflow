import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ApiError";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
interface JwtPayload {
  userId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw ApiError.unauthorized("Haven't token");

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === "string" || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    req.userId = decoded.userId;

    next();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw ApiError.unauthorized("Invalid or expired token");
  }
};
