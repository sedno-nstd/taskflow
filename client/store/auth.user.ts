import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  user: User | null;
  token: string;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<UserAuth>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      setAuth: (user: User, token: string) =>
        set({
          user: user,
          token: token,
        }),
      logout: () =>
        set({
          user: null,
          token: "",
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);
