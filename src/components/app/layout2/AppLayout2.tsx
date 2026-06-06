import { useState } from "react";
import { resolveVerticalSidebarItems } from "@/app/nav-config-si";
import { LocationBanner } from "@/components/app/shared";
import {
  RightPanelProvider,
  useRightPanelContext,
} from "@/shared/contexts/right-panel-context";
import { cn } from "@/shared/lib/utils";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { PanelRightOpen } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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

  const canShowFab = !!rightPanelContent && !isRightPanelOpen;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-dvh fixed font-poppins @container inset-0 flex overflow-hidden bg-background">
      {/* ── Icon rail (hidden on mobile) ─────────────────────────────────── */}
      <div className="hidden md:flex shrink-0">
        <IconRail subPanelOpen={hasSubItems} />
      </div>

      {/* ── Right column: header + (sub-panel | content) ──────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header spans the full right area */}
        <AppHeader2 onMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Body row: optional sub-nav panel + page content */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-background-space">
          {/* Sub-nav panel (hidden on mobile) */}
          <div className="hidden md:flex shrink-0">
            {hasSubItems && subItems && <SubNavPanel items={subItems} />}
          </div>

          {/* Page content */}
          <div className="flex-1 overflow-auto min-w-0">
            <LocationBanner />
            <Outlet />
          </div>

          {/* Right panel (registered by pages via context) */}
          <div
            className={cn(
              "shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
              isRightPanelOpen && rightPanelContent ? "w-80" : "w-0",
            )}
          >
            {rightPanelContent}
          </div>
        </div>
      </div>

      {/* ── Right panel FAB (mobile / when panel is hidden) ───────────── */}
      {canShowFab && (
        <button
          type="button"
          onClick={openRightPanel}
          className="fixed bottom-4 right-4 z-40 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="Open panel"
        >
          {FabIcon ? <FabIcon className="h-5 w-5 mx-auto" /> : <PanelRightOpen className="h-5 w-5 mx-auto" />}
        </button>
      )}

      {/* ── Overlay backdrop ──────────────────────────────────────────── */}
      {isRightPanelOpen && (
        <button
          type="button"
          aria-label="Close panel"
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-200"
          onClick={closeRightPanel}
        />
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
