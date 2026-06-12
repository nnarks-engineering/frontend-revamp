import { useState, useRef, useEffect } from "react";

import {
  Sparkles,
  X,
  Send,
  Bot,
  Loader2,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface AiPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function AiPanel({ isOpen, onClose }: AiPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

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
    <div
      className={cn(
        "h-full flex flex-col bg-white border-l border-border/60 transition-all duration-300 ease-in-out",
        isOpen ? "w-80" : "w-0"
      )}
    >
      {isOpen && (
        <div className="flex flex-col h-full w-80 animate-in fade-in duration-200">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-border/40">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h2 className="text-[13px] font-semibold text-foreground">Nnarks AI</h2>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
              aria-label="Close AI panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
            {messages.length === 0 ? (
              /* Empty State — Welcome */
              <div className="h-full flex flex-col items-center justify-center text-center px-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/15 flex items-center justify-center mb-4 shadow-sm">
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  How can I help?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-[220px]">
                  Ask me anything about your business, transactions, or reports.
                </p>
                <div className="space-y-2 w-full">
                  {WELCOME_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="w-full text-left text-[12px] text-muted-foreground px-3 py-2.5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground transition-all duration-150"
                    >
                      <Sparkles className="w-3 h-3 inline mr-1.5 text-primary/50" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message List */
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed",
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-muted/50 text-foreground rounded-bl-md border border-border/30"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Thinking indicator */}
                {isThinking && (
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-muted/50 border border-border/30 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 text-primary animate-spin" />
                        <span className="text-[11px] text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="shrink-0 border-t border-border/40 p-3">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Nnarks AI..."
                className="w-full pl-4 pr-10 py-2.5 text-[13px] bg-muted/30 border border-border/50 rounded-xl outline-none text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(23,204,236,0.06)] transition-all duration-200"
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-150",
                  inputValue.trim() && !isThinking
                    ? "text-primary hover:bg-primary/10"
                    : "text-muted-foreground/30 cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
              AI features coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
