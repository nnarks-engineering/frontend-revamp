import React from "react";

import { cn } from "@/shared/lib/utils";

import { Avatar } from "./Avatar";

interface Participant {
  name?: string | null;
  avatar?: string | null;
}

interface AvatarStackProps {
  participants: Participant[];
  maxVisible?: number;
  className?: string;
  avatarClassName?: string;
  fallbackClassName?: string;
  onClick?: () => void;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  participants,
  maxVisible = 2,
  className,
  avatarClassName,
  fallbackClassName,
  onClick,
}) => {
  if (!participants || participants.length === 0) return null;

  const visibleParticipants = participants.slice(0, maxVisible);
  const remainingCount = participants.length - maxVisible;

  return (
    <div
      className={cn("group/stack flex -space-x-2", className)}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {visibleParticipants.map((p, i) => (
        <Avatar
          key={i}
          src={p.avatar}
          name={p.name}
          className={cn(
            "border-background hover:border-primary relative border-2 shadow-sm transition-all duration-200 hover:z-30 hover:scale-110",
            avatarClassName,
          )}
          fallbackClassName={fallbackClassName}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "border-background bg-background text-muted-foreground hover:border-primary hover:text-primary relative z-10 flex items-center justify-center rounded-full border-2 font-bold shadow-sm transition-all duration-200 hover:z-30 hover:scale-110",
            avatarClassName,
          )}
        >
          <span className={cn("text-[8px]", avatarClassName?.includes("w-6") && "text-[9px]")}>
            {participants.length > 9 ? "9+" : `+${remainingCount}`}
          </span>
        </div>
      )}
    </div>
  );
};
