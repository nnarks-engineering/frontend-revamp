import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import { SidebarUserMenu } from "@/components/app/sidebar/SidebarUserMenu";
import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GlobalSearch } from "./GlobalSearch";
import { InvitationsDrawer } from "./InvitationsDrawer";
import { useMyInvitations } from "@/shared/hooks/use-company-members";
import { TopNavBar } from "../navigation/TopNavBar";

interface AppHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  showSidebarToggle?: boolean;
}

export function AppHeader({ isSidebarOpen, onToggleSidebar, showSidebarToggle = true }: Readonly<AppHeaderProps>) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [invitationsOpen, setInvitationsOpen] = useState(false);
  const { data: invitations = [] } = useMyInvitations();

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
    <header className="h-14 shrink-0 bg-background backdrop-blur-sm z-50 relative">
      <div className="max-w-360 h-full flex items-center justify-between gap-2 mx-auto px-2">

        {/* ── Left: sidebar toggle / back-arrow + logo ── */}
        <div className="flex items-center gap-1 shrink-0 flex-1">
          {/* Sidebar toggle — mobile only, hidden when search is open */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className={cn(
              "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 lg:hidden",
              (searchOpen || !showSidebarToggle) && "hidden",
            )}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4.5 h-4.5" />
            ) : (
              <PanelLeftOpen className="w-4.5 h-4.5" />
            )}
          </button>

          {/* Back arrow — mobile only, visible when search is open */}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className={cn(
              "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150",
              searchOpen ? "flex md:hidden" : "hidden",
            )}
            aria-label="Close search"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>

          {/* Logo — hidden on mobile when search is open */}
          <Link
            to="/home"
            className={cn(
              "flex items-center h-14 gap-2 px-3 group shrink-0",
              searchOpen ? "hidden md:flex" : "flex",
            )}
          >
            <NnarksLogo className="size-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-millik text-primary font-semibold tracking-tight hidden sm:block">
              Nnarks
            </span>
          </Link>

            <div
          className={cn(
            "min-w-0 flex-1 transition-all duration-300 delay-100",
            searchOpen
              ? "md:max-w-lg"                          // fills all available space when active
              : "hidden md:block w-52 max-w-xs", // desktop-only fixed width when idle
          )}
        >
          <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      </div>

        {/* ── Right: mobile search icon + bell + user ── */}
        <div
          className={cn(
            "flex items-cente gap-1 mt-auto shrink-0",
            searchOpen && "hidden md:flex",  // hide entirely on mobile when search is open
          )}
        >
           <div className={cn(
          "flex-1",
          searchOpen ? "hidden sm:flex" : "flex"
        )}>
          <TopNavBar />

        </div>
          {/* Mobile search trigger */}
          <button
            type="button"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Notifications / Invitations */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
            aria-label="Notifications"
            onClick={() => setInvitationsOpen(true)}
          >
            <Bell className="w-4.5 h-4.5" />
            {invitations.length > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-destructive rounded-full ring-2 ring-background px-1">
                {invitations.length}
              </span>
            )}
          </button>

          <SidebarUserMenu />
        </div>

        <InvitationsDrawer open={invitationsOpen} onClose={() => setInvitationsOpen(false)} />
      </div>
    </header>
  );
}

