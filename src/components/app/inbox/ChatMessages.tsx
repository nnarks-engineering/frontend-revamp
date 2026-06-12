import { useEffect, useRef, useState } from "react";

import { ArrowDown, ArrowUp, ChevronLeft, Paperclip } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { ChatSession, Message } from "@/types/messaging";

import { Avatar } from "./Avatar";

interface ChatMessagesProps {
  thread: ChatSession | null;
  messages: Message[];
  message: string;
  setMessage: (m: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onBack?: () => void;
  onParticipantClick?: (thread: ChatSession) => void;
  isLoading?: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  thread,
  messages,
  message,
  setMessage,
  onSend,
  onKeyDown,
  onBack,
  isLoading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollBottom(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-card relative flex min-h-0 flex-1 flex-col">
      {/* HEADER / BACK NAV */}
      {thread && (
        <div className="border-border bg-background/30 z-10 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-sm">
          {onBack && (
            <button
            type="button"
              onClick={onBack}
              className="hover:bg-primary/10 text-primary cursor-pointer rounded-full p-1.5 transition-all md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex flex-1 items-center justify-between gap-3">
            <button type="button" className="group/header flex min-w-0 cursor-pointer items-center gap-3 text-left focus:outline-none">
              <Avatar
                src={null}
                name={thread.name || "Unnamed Chat"}
                className="border-border h-8 w-8 border transition-transform group-hover/header:scale-105"
              />
              <div className="min-w-0">
                <h4 className="text-foreground group-hover/header:text-primary truncate text-[14px] leading-none font-bold transition-colors">
                  {thread.name || "Unnamed Chat"}
                </h4>
                <p className="text-muted-foreground mt-1 truncate text-[11px]">
                  {thread.session_type}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* MESSAGES STREAM */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="custom-scrollbar relative flex flex-1 flex-col gap-4 overflow-y-auto p-4"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "HUMAN";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[85%] flex-col",
                isUser ? "ml-auto items-end" : "items-start",
              )}
            >
              <div
                className={cn(
                  "text-[14px] leading-relaxed",
                  isUser
                    ? "bg-secondary/35 text-foreground border-secondary/45 rounded-2xl rounded-tr-none border px-3 py-2 shadow-sm"
                    : "text-foreground bg-accent/20 border-accent/30 rounded-2xl rounded-tl-none border px-3 py-2",
                )}
              >
                {msg.content}
              </div>
              <span className="text-muted-foreground mt-1 px-1 text-[10px] opacity-70">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-center space-x-2 p-2">
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-.3s]" />
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-.5s]" />
          </div>
        )}
      </div>

      {/* SCROLL TO BOTTOM BUTTON */}
      {showScrollBottom && (
        <button
        type="button"
          onClick={scrollToBottom}
          className="bg-background/80 border-border text-primary animate-in fade-in slide-in-from-bottom-2 absolute bottom-30 left-1/2 z-20 -translate-x-1/2 cursor-pointer rounded-full border p-2 shadow-lg backdrop-blur-md transition-all hover:scale-110 focus:outline-none active:scale-95"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}

      {/* INPUT AREA */}
      <div className="bg-card border-border border-t p-4">
        <div className="bg-background/50 border-border focus-within:ring-primary flex items-end gap-2 rounded-2xl border p-2 transition-all focus-within:ring-1">
          <button type="button" className="text-muted-foreground hover:text-primary hover:bg-primary/5 mb-0.5 shrink-0 cursor-pointer rounded-xl p-2 transition-colors focus:outline-none">
            <Paperclip className="h-4 w-4" />
          </button>

          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a message..."
            className="placeholder:text-muted-foreground/50 min-h-11 flex-1 resize-none border-none bg-transparent py-2 text-[14px] leading-relaxed font-medium focus:outline-none"
          />

          <div className="mb-0.5 flex shrink-0 items-center">
            <button
              type="button"
              onClick={onSend}
              disabled={!message.trim() || isLoading}
              className={cn(
                "border flex cursor-pointer items-center justify-center rounded-full p-2 transition-all focus:outline-none",
                !message.trim() || isLoading
                  ? "border-border text-muted-foreground cursor-not-allowed"
                  : "border-primary text-primary hover:bg-primary/10"
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
