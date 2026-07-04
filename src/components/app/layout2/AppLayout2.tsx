import { Outlet, useRouterState } from "@tanstack/react-router";
import { PanelRightOpen } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { resolveVerticalSidebarItems } from "@/app/nav-config-si";
import { LocationBanner } from "@/components/app/shared";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  RightPanelProvider,
  useRightPanelContext,
} from "@/shared/contexts/ui/right-panel-context";
import { cn } from "@/shared/lib/utils";


import { AppHeader2 } from "./AppHeader2";
import { IconRail } from "./IconRail";
import { SubNavPanel } from "./SubNavPanel";

// ─── Public shell ─────────────────────────────────────────────────────────────

export function AppLayout2() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RightPanelProvider>
        <AppLayout2Inner />
      </RightPanelProvider>
    </ThemeProvider>
  );
}

// ─── Inner layout ────────────────────────────────────────────────────────────

function AppLayout2Inner() {
  const {
    isOpen: isRightPanelOpen,
    close: closeRightPanel,
    open: openRightPanel,
    content: rightPanelContent,
    icon: FabIcon,
  } = useRightPanelContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const subItems = resolveVerticalSidebarItems(pathname);
  const hasSubItems = !!subItems?.length;

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync panel open state across screen-size transitions
  const prevSmallRef = useRef(isSmallScreen);
  useEffect(() => {
    const wasSmall = prevSmallRef.current;
    prevSmallRef.current = isSmallScreen;

    // Mobile → Desktop: re-open if there's content
    if (wasSmall && !isSmallScreen && rightPanelContent) {
      openRightPanel();
    }
    // Desktop → Mobile: close so user sees the FAB instead
    if (!wasSmall && isSmallScreen && isRightPanelOpen) {
      closeRightPanel();
    }
  }, [isSmallScreen, rightPanelContent, isRightPanelOpen, openRightPanel, closeRightPanel]);

  const canShowFab = isSmallScreen && !!rightPanelContent && !isRightPanelOpen;

  return (
    <div className="h-dvh fixed font-poppins @container inset-0 flex overflow-hidden bg-background">
      {/* ── Icon rail (hidden on mobile) ─────────────────────────────────── */}
      <div className="hidden md:flex shrink-0 relative z-10">
        <IconRail subPanelOpen={hasSubItems} />
      </div>

      {/* ── Right column: header + (sub-panel | content) ──────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-20">
        {/* Header spans the full right area */}
        <AppHeader2 onMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Body row: optional sub-nav panel + page content */}
        <div className="flex-1 flex min-h-0 bg-background-space">
          {/* Sub-nav panel (hidden on mobile) */}
          <div className="hidden md:flex shrink-0">
            {hasSubItems && subItems && <SubNavPanel items={subItems} />}
          </div>

          {/* Page content */}
          <div className="flex-1 overflow-auto min-w-0 @container">
            <LocationBanner />
            <Outlet />
          </div>

          {/* Desktop right panel — inline, hidden on mobile */}
          <div
            className={cn(
              "shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
              "hidden lg:block border-l border-border/50",
              isRightPanelOpen && rightPanelContent ? "w-80" : "w-0",
            )}
          >
            {rightPanelContent}
          </div>
        </div>
      </div>

      {/* ── Mobile right panel — rendered as a Sheet (portal) ─────────── */}
      <Sheet
        open={isSmallScreen && isRightPanelOpen && !!rightPanelContent}
        onOpenChange={(open) => { if (!open) closeRightPanel(); }}
      >
        <SheetContent side="right" className="p-0 w-80 max-w-[85vw]">
          {rightPanelContent}
        </SheetContent>
      </Sheet>

      {/* ── Right panel FAB (mobile only, when panel is collapsed) ──── */}
      {canShowFab && (
        <button
          type="button"
          onClick={openRightPanel}
          className="fixed bottom-4 right-4 z-40 lg:hidden h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="Open panel"
        >
          {FabIcon ? <FabIcon className="h-5 w-5 mx-auto" /> : <PanelRightOpen className="h-5 w-5 mx-auto" />}
        </button>
      )}

      {/* ── Mobile Navigation Drawer ───────────────────────────────────── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 flex w-auto max-w-xs border-r-0">
          <IconRail subPanelOpen={hasSubItems} />
          {hasSubItems && subItems && <SubNavPanel items={subItems} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
