import { cn } from "@/shared/lib/utils";

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string
): string {
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

interface UserAvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-7 h-7 text-xs",
  lg: "w-8 h-8 text-xs",
};

export function UserAvatar({
  firstName,
  lastName,
  email,
  size = "md",
  className,
}: UserAvatarProps) {
  const initials = getInitials(firstName, lastName, email);
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-linear-to-br from-primary via-primary/80 to-secondary flex items-center justify-center text-white font-bold",
        sizeMap[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

export { getInitials };
