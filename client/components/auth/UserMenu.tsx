"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.user";
import { Button } from "../ui/Button";
import { APP_ROUTES } from "@/constants/route";
import { userService } from "@/services/user.service";
import { useHasMounted } from "@/hooks/useHasMounted";

export function UserMenu() {
  const router = useRouter();
  const { user, token, updateUser, logout } = useAuthStore();
  const hasMounted = useHasMounted();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!hasMounted) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200" />;
  }

  if (user === null) {
    return (
      <div className="flex flex-row gap-3 max-h-8 transition-all">
        <a href={APP_ROUTES.LOGIN} className="w-full h-full">
          <Button
            variant="primary"
            text="Log in"
            className="cursor-pointer px-3 py-2 text-sm font-medium"
          />
        </a>
        <a href={APP_ROUTES.REGISTER} className="w-full h-full">
          <Button
            variant="secondary"
            text="Register"
            className="cursor-pointer px-3 py-2 text-sm font-medium"
          />
        </a>
      </div>
    );
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateAvatar(file, token);
      updateUser({ avatar: updatedUser.avatar });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload avatar");
    } finally {
      setIsLoading(false);
      e.target.value = "";
    }
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-900 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{user.name[0]?.toUpperCase()}</span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg">
            <div className="border-b border-zinc-100 pb-2.5">
              <p className="text-sm font-medium text-zinc-900">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
              <span className="mt-1 inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                {user.role}
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <label className="cursor-pointer rounded-lg px-2.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100">
                {isLoading ? "Uploading..." : "Change avatar"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              {error && (
                <p className="px-2.5 py-1 text-xs text-red-500">{error}</p>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer rounded-lg px-2.5 py-1.5 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
