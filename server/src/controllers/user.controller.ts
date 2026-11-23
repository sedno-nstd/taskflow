import { Request, Response } from "express";
import { ApiError } from "../lib/ApiError";
import { userService } from "../services/user.service";

class UserController {
  async updateAvatar(req: Request, res: Response) {
    if (!req.file) {
      throw ApiError.badRequest("File is required");
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const user = await userService.updateAvatar(req.userId!, avatarUrl);

    return res.status(200).json({ user });
  }
}

export const userController = new UserController();
