import { resolvePageTitle } from "@/app/nav-config";
import { AiPanel } from "@/components/app/ai-panel/AiPanel";
import { AppHeader } from "@/components/app/header/AppHeader";
import { SubNavBar } from "@/components/app/navigation/SubNavBar";
import { LocationBanner } from "@/components/app/shared";
import { SidebarNav } from "@/components/app/sidebar/SidebarNav";
import { RightPanelProvider, useRightPanelContext } from "@/shared/contexts/right-panel-context";
import { cn } from "@/shared/lib/utils";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

// ─── Outer shell — just provides the right-panel context ─────────────────────

export function AppLayout() {
  return (
    <RightPanelProvider>
      <AppLayoutInner />
    </RightPanelProvider>
  );
}

// ─── Inner layout — consumes the right-panel context ─────────────────────────

function AppLayoutInner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isOpen: isRightPanelOpen, close: closeRightPanel, content: rightPanelContent } =
    useRightPanelContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pageTitle = resolvePageTitle(pathname);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  const closeAllOverlaysOnMobile = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
      closeRightPanel();
    }
  }, [isMobile, closeRightPanel]);

  return (
    <div className="h-dvh fixed inset-0 flex bg-background font-outfit">
      {/* Left Sidebar — Desktop: inline, Mobile: fixed overlay */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-40",
          "max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full",
          isMobile
            ? isSidebarOpen
              ? "max-lg:w-[252px]"
              : "max-lg:w-0"
            : "", // Desktop width managed by SidebarNav itself
        )}
      >
        <SidebarNav
          isCollapsed={!isMobile && isSidebarCollapsed}
          onToggle={toggleSidebar}
          onClose={isMobile ? closeSidebarOnMobile : undefined}
        />
      </div>

      {/* Main content column */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-in-out">
        {/* Header */}
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />

        {/* Horizontal sub-navigation tabs (auto-hides when not applicable) */}
        <SubNavBar />

        {/* Page content */}
        <main
          className="flex-1 overflow-auto bg-background"
          onClick={closeAllOverlaysOnMobile}
        >
          <div className="p-4 md:p-6 min-h-full">
            <LocationBanner />
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right panel — AI Panel (default) or page-registered content */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-40",
          "max-lg:fixed max-lg:right-0 max-lg:top-0 max-lg:h-full",
          isRightPanelOpen ? "w-80" : "w-0",
        )}
      >
        {/* Fall back to AI Panel when no page has registered custom content */}
        {rightPanelContent ?? (
          <AiPanel isOpen={isRightPanelOpen} onClose={closeRightPanel} />
        )}
      </div>

      {/* Mobile overlay backdrop */}
      {isMobile && (isSidebarOpen || isRightPanelOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-200"
          onClick={closeAllOverlaysOnMobile}
        />
      )}
    </div>
  );
}
