import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import { SidebarUserMenu } from "@/components/app/sidebar/SidebarUserMenu";
import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { Bell, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GlobalSearch } from "./GlobalSearch";

interface AppHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function AppHeader({ isSidebarOpen, onToggleSidebar }: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="h-14 shrink-0 flex items-center justify-between gap-3 pr-4 border-b !border-background bg-white/80 backdrop-blur-sm font-outfit z-50 relative">
      {/* Left — Mobile Toggle + Logo */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile-only sidebar toggle */}
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

        {/* Logo */}
        <Link to="/" className="flex items-center h-14 gap-2 px-4 group shrink-0 md:w-[220px]  ">
          <NnarksLogo className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span className="text-xl font-millik text-primary font-semibold tracking-tight text-foreground hidden sm:block">
            Nnarks
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-border/60 mx-1 hidden sm:block" />
      </div>

      {/* Center — Search (clicking opens modal) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className={cn(
            "w-full relative flex items-center rounded-xl border transition-all duration-200",
            "border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/30 cursor-pointer",
          )}
        >
          <Search className="w-4 h-4 text-muted-foreground/60 absolute left-3 pointer-events-none" />
          <span className="w-full pl-9 pr-4 py-2 text-[13px] text-left text-muted-foreground/50 font-outfit">
            Search anything...
          </span>
          <kbd className="absolute right-3 hidden lg:inline text-[10px] font-mono text-muted-foreground/40 border border-border/50 rounded px-1.5 py-0.5 bg-white">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right — Mobile Search + Notifications + User */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Mobile search icon */}
        <button
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 md:hidden"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-[18px] h-[18px]" />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-white" />
        </button>

        {/* User profile menu */}
        <SidebarUserMenu />
      </div>

      {/* Global Search Modal */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
