import { useRightPanelContext } from "@/shared/contexts/right-panel-context";
import { cn } from "@/shared/lib/utils";
import {
    ChevronDown,
    Moon,
    PanelLeftClose,
    PanelLeftOpen,
    PanelRightClose,
    PanelRightOpen,
    Search,
    Sparkles,
    Sun,
} from "lucide-react";
import { useState } from "react";

interface AppHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle?: string;
}

export function AppHeader({
  isSidebarOpen,
  onToggleSidebar,
  pageTitle = "Dashboard",
}: AppHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { isOpen: isRightPanelOpen, toggle: toggleRightPanel } =
    useRightPanelContext();

  return (
    <header className="h-14 shrink-0 flex items-center justify-between gap-3 px-4 border-b border-border/40 bg-white/80 backdrop-blur-sm font-outfit">
      {/* Left — Sidebar Toggle + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-[18px] h-[18px]" />
          ) : (
            <PanelLeftOpen className="w-[18px] h-[18px]" />
          )}
        </button>

        {/* Breadcrumb-style title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs text-muted-foreground/60 hidden sm:inline">Nnarks</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/40 hidden sm:inline" />
          <h1 className="text-sm font-semibold text-foreground truncate">{pageTitle}</h1>
        </div>
      </div>

      {/* Center — Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div
          className={cn(
            "relative flex items-center rounded-xl border transition-all duration-200",
            searchFocused
              ? "border-primary/50 bg-white shadow-[0_0_0_3px_rgba(23,204,236,0.08)]"
              : "border-border/50 bg-muted/30 hover:bg-muted/50"
          )}
        >
          <Search className="w-4 h-4 text-muted-foreground/60 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-2 text-[13px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 font-outfit"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 hidden lg:inline text-[10px] font-mono text-muted-foreground/40 border border-border/50 rounded px-1.5 py-0.5 bg-white">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-1">
        {/* Search icon (mobile) */}
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 md:hidden">
          <Search className="w-[18px] h-[18px]" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Right Panel Toggle (AI Panel / page-registered panel) */}
        <button
          onClick={toggleRightPanel}
          className={cn(
            "p-2 rounded-lg transition-all duration-150 flex items-center gap-1.5",
            isRightPanelOpen
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          )}
          aria-label="Toggle right panel"
        >
          <Sparkles className="w-[18px] h-[18px]" />
          <span className="text-xs font-medium hidden sm:inline">
            {isRightPanelOpen ? "Close" : "AI"}
          </span>
          {!isRightPanelOpen && (
            <PanelRightOpen className="w-3.5 h-3.5 hidden sm:inline" />
          )}
          {isRightPanelOpen && (
            <PanelRightClose className="w-3.5 h-3.5 hidden sm:inline" />
          )}
        </button>
      </div>
    </header>
  );
}
