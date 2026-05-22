import { cn } from "@/shared/lib/utils";
import { createFileRoute } from '@tanstack/react-router';
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_SUGGESTIONS = [
  "Summarize today's transactions",
  "Show overdue payments",
  "Generate monthly report",
  "Analyze client activity",
];

function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "This is a placeholder response. AI integration will be connected soon — once implemented, I'll be able to help you with transaction insights, report generation, client analysis, and more.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm font-outfit">


      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 scrollbar-hide">
        {messages.length === 0 ? (
          /* Empty State — Welcome */
          <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/15 flex items-center justify-center mb-6 shadow-sm border border-white">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              How can I help you today?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              I can analyze your transactions, generate custom reports, or answer questions about your organization's activity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {WELCOME_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="text-left text-[13px] text-muted-foreground px-4 py-3.5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-primary/40 mt-0.5 group-hover:text-primary transition-colors" />
                    <span className="leading-tight">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message List */
          <div className="max-w-3xl mx-auto w-full space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-primary/20 to-secondary/20 border border-white shadow-sm"
                    : "bg-muted"
                )}>
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-muted-foreground/30" /> // generic user placeholder
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl text-[14px] leading-relaxed max-w-[80%]",
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-white border border-border/40 text-foreground rounded-tl-sm shadow-sm"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex gap-4 flex-row animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white shadow-sm flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-white border border-border/40 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-[13px] text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 md:p-6 bg-white/80 border-t border-border/40">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-end gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Nnarks AI..."
              className="w-full pl-5 pr-14 py-3.5 text-[14px] bg-white border border-border/60 shadow-sm rounded-2xl outline-none text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all duration-200 font-outfit"
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200",
                inputValue.trim() && !isThinking
                  ? "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
                  : "bg-muted text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        <p className="text-[11px] text-muted-foreground/60 text-center mt-3">
          AI can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_app/inbox/nnarks-ai')({
  component: AiChatPage,
})
