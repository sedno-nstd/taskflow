import { ApiError } from "../lib/ApiError";
import { prisma } from "../lib/prisma";

class UserService {
  async updateAvatar(userId: string, avatar: string) {
    if (!userId || !avatar) {
      throw ApiError.badRequest("Invalid data");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatar },
    });

    const { password: _, ...safeUser } = updatedUser;

    return safeUser;
  }
}

export const userService = new UserService();
