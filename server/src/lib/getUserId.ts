import { Request } from "express";
import { ApiError } from "./ApiError";

export function getUserId(req: Request): string {
  if (!req.userId) {
    throw ApiError.unauthorized("User is not authorized");
  }
  return req.userId;
}
