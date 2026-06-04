import { resolveVerticalSidebarItems } from "@/app/nav-config";
import { AppHeader } from "@/components/app/header/AppHeader";
import { SidebarSubNavBar } from "@/components/app/navigation/SidebarSubNavBar";
import { LocationBanner } from "@/components/app/shared";
import { SidebarNav } from "@/components/app/sidebar/SidebarNav";
import { RightPanelProvider, useRightPanelContext } from "@/shared/contexts/right-panel-context";
import { cn } from "@/shared/lib/utils";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { PanelRightOpen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

// ─── Outer shell — just provides the right-panel context ─────────────────────

export function AppLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RightPanelProvider>
        <AppLayoutInner />
      </RightPanelProvider>
    </ThemeProvider>
  );
}

// ─── Inner layout — consumes the right-panel context ─────────────────────────

function AppLayoutInner() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { isOpen: isRightPanelOpen, close: closeRightPanel, open: openRightPanel, content: rightPanelContent } =
    useRightPanelContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hasSubItems = !!resolveVerticalSidebarItems(pathname)?.length;

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      const smallScreen = window.innerWidth < 1024;
      setIsSmallScreen(smallScreen);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const closeAllOverlaysOnMobile = useCallback(() => {
    if (isSmallScreen) {
      closeRightPanel();
    }
  }, [isSmallScreen, closeRightPanel]);

  const noopToggleSidebar = useCallback(() => undefined, []);

  const mobileTopOffsetClass = isSmallScreen && hasSubItems
    ? "max-lg:top-24 max-lg:h-[calc(100dvh-6rem)]"
    : "max-lg:top-14 max-lg:h-[calc(100dvh-3.5rem)]";

  const canShowRightPanelFab = isSmallScreen && !!rightPanelContent && !isRightPanelOpen;

  return (
    <div className="h-dvh fixed font-poppins inset-0 flex flex-col bg-background ">
      {/* Full-width header */}
      <AppHeader
        isSidebarOpen={false}
        onToggleSidebar={noopToggleSidebar}
        showSidebarToggle={false}
      />

      {/* Small screens: show route sub-items as horizontal bar below header */}
      {isSmallScreen && hasSubItems ? <SidebarSubNavBar /> : null}

      {/* Content row: sidebar + main column + right panel */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar — desktop only */}


        {/* Main column */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Main navigation — all top-level sections as horizontal tabs */}
          {/* <TopNavBar /> */}

          {/* Page content */}
          <main
            className="flex-1 flex  bg-background-space overflow-hidden min-h-0 "
          >
        <div
          className={cn(
            "shrink-0 overflow-hidden z-10 relative -mt-0.5 text-sm text-black font-med transition-all duration-300 ease-in-out",
            "max-lg:hidden",
            hasSubItems ? "w-55" : "w-0",
          )}
        >
          <SidebarNav />
        </div>
            <div className="p-3 md:p-5 min-h-full flex-1 overflow-auto ">
              <LocationBanner />
              <Outlet />
            </div>
            <div
          className={cn(
            "shrink-0 overflow-hidden mt-4  rounded-tl-2xl transition-all duration-300 ease-in-out",
            "max-lg:fixed max-lg:right-0 max-lg:z-40",
            mobileTopOffsetClass,
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
      {isSmallScreen && isRightPanelOpen && (
        <button
          type="button"
          aria-label="Close right panel"
          className={cn(
            "fixed inset-x-0 bottom-0 bg-black/40 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-200",
            isSmallScreen && hasSubItems ? "top-24" : "top-14",
          )}
          onClick={closeAllOverlaysOnMobile}
        />
      )}

      {canShowRightPanelFab && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openRightPanel();
          }}
          className="fixed bottom-4 right-4 z-40 lg:hidden h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="Open right panel"
        >
          <PanelRightOpen className="h-5 w-5 mx-auto" />
        </button>
      )}
    </div>
  );
}
