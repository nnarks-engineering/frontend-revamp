import NoUsersSvg from "@/assets/svg/no-users.svg?react";
import { cn } from "@/shared/lib/utils";
import type { ChatSession } from "@/types/messaging/messaging.types";

import { Avatar } from "./Avatar";


interface ChatThreadListProps {
  threads: ChatSession[];
  activeThreadId?: string;
  onThreadClick: (thread: ChatSession) => void;
  onParticipantClick?: (thread: ChatSession) => void;
}

export const ChatThreadList: React.FC<ChatThreadListProps> = ({
  threads,
  activeThreadId,
  onThreadClick,
  // onParticipantClick,
}) => {
  return (
    <div className=" custom-scrollbar flex-1 overflow-y-auto">
      <div className="flex flex-col">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <NoUsersSvg className="w-24 h-auto mb-4 text-primary" />
            <p className="text-[12px] text-muted-foreground max-w-50 leading-relaxed">
              No conversations yet
            </p>
          </div>
        ) : (
          threads.map((thread) => {
            const isActive = activeThreadId === thread.id;
            const displayTitle = thread.name || "Unnamed Chat";
            const unreadCount = 0; // TODO: Implement unreads
            const description = thread.session_type;

            return (
              <button
              type="button"
                key={thread.id}
                onClick={() => onThreadClick(thread)}
                className={cn(
                  "border-border group/thread flex cursor-pointer items-start gap-3 border-b p-4 text-left transition-all",
                  isActive ? "bg-primary/5" : "hover:bg-accent/50",
                )}
              >
                <div className="relative shrink-0">
                  <Avatar
                    src={null}
                    name={displayTitle}
                    className="border-border h-10 w-10 border transition-transform group-hover/thread:scale-105"
                  />
                  {unreadCount > 0 && (
                    <div className="bg-primary border-background absolute -top-1 -right-1 h-4 w-4 rounded-full border-2" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "group-hover/thread:text-primary truncate font-bold transition-colors",
                        unreadCount > 0
                          ? "text-foreground text-[14px]"
                          : "text-foreground/90 text-[13px]",
                      )}
                    >
                      {displayTitle}
                    </h3>
                  </div>

                  {description && (
                    <p className="text-muted-foreground mb-0.5 truncate text-[11px]">
                      {description}
                    </p>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
