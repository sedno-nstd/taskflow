import { API_ROUTES } from "@/constants/route";
import { User } from "@/types/user";

export const userService = {
  async updateAvatar(file: File, token: string): Promise<User> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    formData.append("avatar", file);

    const result = await fetch(`${API_URL}${API_ROUTES.USERS.UPDATE_AVATAR}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await result.json();

    if (!result.ok) throw new Error(data.message || "Something went wrong");

    return data.user;
  },
};
