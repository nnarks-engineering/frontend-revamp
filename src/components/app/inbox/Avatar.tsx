import type React from "react";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name = "Unknown", className, fallbackClassName }) => {
  const [error, setError] = useState(false);

  // Get first two characters of the name
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src || error) {
    return (
      <div
        className={cn(
          "bg-primary/10 text-primary border-primary/20 flex shrink-0 items-center justify-center rounded-full border text-[10px] font-bold select-none",
          className,
          fallbackClassName,
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || "Avatar"}
      onError={() => setError(true)}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
};
