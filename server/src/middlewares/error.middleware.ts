import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ApiError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log("Unexpected Error", err);
  return res.status(500).json({ message: "Internal Server Error" });
}
