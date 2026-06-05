import { resolveVerticalSidebarItems } from "@/app/nav-config";
import { LocationBanner } from "@/components/app/shared";
import {
  RightPanelProvider,
  useRightPanelContext,
} from "@/shared/contexts/right-panel-context";
import { cn } from "@/shared/lib/utils";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { PanelRightOpen } from "lucide-react";
import { ThemeProvider } from "next-themes";
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
  } = useRightPanelContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const subItems = resolveVerticalSidebarItems(pathname);
  const hasSubItems = !!subItems?.length;

  const canShowFab = !!rightPanelContent && !isRightPanelOpen;

  return (
    <div className="h-dvh fixed font-poppins inset-0 flex overflow-hidden bg-background">
      {/* ── Icon rail (always visible) ─────────────────────────────────── */}
      <IconRail subPanelOpen={hasSubItems} />

      {/* ── Right column: header + (sub-panel | content) ──────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header spans the full right area */}
        <AppHeader2 />

        {/* Body row: optional sub-nav panel + page content */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-background-space">
          {/* Sub-nav panel */}
          {hasSubItems && subItems && <SubNavPanel items={subItems} />}

          {/* Page content */}
          <div className="flex-1 p-4 md:p-6 overflow-auto min-w-0">
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
          <PanelRightOpen className="h-5 w-5 mx-auto" />
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
    </div>
  );
}
