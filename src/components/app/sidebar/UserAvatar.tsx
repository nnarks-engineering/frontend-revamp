import { Avatar as ProfileImage } from "@/components/image/Image";
import { cn } from "@/shared/lib/utils";

interface UserAvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
  lg: "w-8 h-8",
};

const sizePx = {
  sm: 24,
  md: 28,
  lg: 32,
};

export function UserAvatar({
  firstName,
  lastName,
  email,
  src,
  size = "md",
  className,
}: Readonly<UserAvatarProps>) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;
  const alt = fullName ?? email ?? "User";

  return (
    <ProfileImage
      src={src}
      fullName={fullName}
      alt={alt}
      width={sizePx[size]}
      height={sizePx[size]}
      className={cn(
        "shrink-0 overflow-hidden border border-border/50",
        sizeMap[size],
        className
      )}
    />
  );
}
