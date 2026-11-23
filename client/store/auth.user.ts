import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  user: User | null;
  token: string;
  setAuth: (user: User, token: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<UserAuth>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
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
