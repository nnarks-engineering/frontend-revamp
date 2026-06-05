import { GlobalSearch } from "@/components/app/header/GlobalSearch";
import { InvitationsDrawer } from "@/components/app/header/InvitationsDrawer";
import { SidebarUserMenu } from "@/components/app/sidebar/SidebarUserMenu";
import { useMyInvitations } from "@/shared/hooks/use-company-members";
import { Link } from "@tanstack/react-router";
import { Bell, BrainCircuit, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function AppHeader2() {
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
    <header className="h-12 shrink-0 bg-background border-b border-border/50 flex items-center justify-end gap-1 px-4 z-30">
      {/* ── Right actions: search · AI · bell · user ── */}

      {/* Search icon + ⌘K hint */}
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <kbd className="hidden lg:inline text-[10px] font-mono text-muted-foreground/60 border border-border rounded px-1.5 py-0.5 bg-muted/40 pointer-events-none">
          ⌘K
        </kbd>
      </button>

      {/* AI shortcut */}
      <Link
        to="/inbox/ai"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        aria-label="Nnarks AI"
      >
        <BrainCircuit className="w-4.5 h-4.5" />
      </Link>

      {/* Notifications / Invitations */}
      <button
        type="button"
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
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

      {/* User menu */}
      <SidebarUserMenu />

      {/* ── Search modal (portalled, centered) ──────── */}
      {searchOpen &&
        createPortal(
          <div className="fixed top-[18%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
          </div>,
          document.body,
        )}

      <InvitationsDrawer
        open={invitationsOpen}
        onClose={() => setInvitationsOpen(false)}
      />
    </header>
  );
}

