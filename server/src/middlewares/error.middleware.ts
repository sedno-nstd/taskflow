import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ApiError";

export function errorMidleewere(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode as number).json({ message: err.message });
  }

  console.log("Unexpected Error");
  return res.status(500).json({ message: "Internal Server Error" });
}
