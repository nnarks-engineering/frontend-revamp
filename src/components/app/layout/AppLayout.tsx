import { resolveVerticalSidebarItems } from "@/app/nav-config";
import { AppHeader } from "@/components/app/header/AppHeader";
import { TopNavBar } from "@/components/app/navigation/TopNavBar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isOpen: isRightPanelOpen, close: closeRightPanel, content: rightPanelContent } =
    useRightPanelContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hasSubItems = !!resolveVerticalSidebarItems(pathname)?.length;

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) setIsSidebarOpen((prev) => !prev);
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
    <div className="h-dvh fixed inset-0 flex flex-col bg-background font-outfit">
      {/* Full-width header */}
      <AppHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {/* Content row: sidebar + main column + right panel */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar — desktop: in-flow (hidden when no sub-items); mobile: fixed overlay */}


        {/* Main column */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Main navigation — all top-level sections as horizontal tabs */}
          <TopNavBar />

          {/* Page content */}
          <main
            className="flex-1 flex  bg-slate-100 "
            onClick={closeAllOverlaysOnMobile}
          > <div
          className={cn(
            "shrink-0 overflow-hidden text-sm pt-3 text-black font-med transition-all duration-300 ease-in-out",
            "max-lg:fixed max-lg:left-0 text-sm max-lg:top-14 max-lg:h-[calc(100dvh-3.5rem)] max-lg:z-40",
            isMobile
              ? isSidebarOpen ? "w-[220px]" : "w-0"
              : hasSubItems ? "w-[220px]" : "w-0",
          )}
        >
          <SidebarNav onClose={isMobile ? closeSidebarOnMobile : undefined} />
        </div>
            <div className="p-3 md:p-4 min-h-full flex-1 overflow-auto ">
              <LocationBanner />
              <Outlet />
            </div> <div
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
            "max-lg:fixed max-lg:right-0 max-lg:top-14 max-lg:h-[calc(100dvh-3.5rem)] max-lg:z-40",
            isRightPanelOpen && rightPanelContent ? "w-80" : "w-0",
          )}
        >
          {rightPanelContent}
        </div>
          </main>
        </div>

        {/* Right panel — page-registered content only */}

      </div>

      {/* Mobile overlay backdrop — sits below the header */}
      {isMobile && (isSidebarOpen || isRightPanelOpen) && (
        <div
          className="fixed inset-x-0 top-14 bottom-0 bg-black/40 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-200"
          onClick={closeAllOverlaysOnMobile}
        />
      )}
    </div>
  );
}
