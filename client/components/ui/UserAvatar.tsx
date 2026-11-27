export type AvatarSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "w-6 h-6 text-[11px]",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-base",
};

interface UserAvatarProps {
  avatar?: string | null;
  name?: string | null;
  size?: AvatarSize;
  className?: string;
}

export function UserAvatar({
  avatar,
  className,
  name,
  size = "sm",
}: UserAvatarProps) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <div
      title={name ?? "User"}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-900 font-semibold text-white select-none ${SIZE_CLASSES[size]} ${className}`}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name ?? "User avatar"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
