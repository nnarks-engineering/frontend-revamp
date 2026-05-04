import { useState, useEffect, useCallback } from "react";
import { Outlet } from "@tanstack/react-router";
import { SidebarNav } from "@/components/app/sidebar/SidebarNav";
import { AppHeader } from "@/components/app/header/AppHeader";
import { AiPanel } from "@/components/app/ai-panel/AiPanel";
import { cn } from "@/shared/lib/utils";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
        setIsAiPanelOpen(false);
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

  const toggleAiPanel = useCallback(() => {
    setIsAiPanelOpen((prev) => !prev);
  }, []);

  const closeSidebarsOnMobile = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
      setIsAiPanelOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="h-dvh fixed inset-0 flex bg-background font-outfit">
      {/* Left Sidebar — Desktop: inline, Mobile: fixed overlay */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-40",
          // Mobile: fixed overlay
          "max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full",
          // Visibility
          isMobile
            ? isSidebarOpen ? "max-lg:w-[252px]" : "max-lg:w-0"
            : "" // Desktop sizing handled by SidebarNav itself
        )}
      >
        <SidebarNav
          isCollapsed={!isMobile && isSidebarCollapsed}
          onToggle={toggleSidebar}
          onClose={isMobile ? closeSidebarsOnMobile : undefined}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-in-out">
        {/* Header */}
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          isAiPanelOpen={isAiPanelOpen}
          onToggleSidebar={toggleSidebar}
          onToggleAiPanel={toggleAiPanel}
        />

        {/* Page Content */}
        <main
          className="flex-1 overflow-auto bg-background"
          onClick={closeSidebarsOnMobile}
        >
          <div className="p-4 md:p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Right Sidebar — AI Panel */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-40",
          "max-lg:fixed max-lg:right-0 max-lg:top-0 max-lg:h-full",
          isAiPanelOpen ? "w-80" : "w-0"
        )}
      >
        <AiPanel isOpen={isAiPanelOpen} onClose={() => setIsAiPanelOpen(false)} />
      </div>

      {/* Mobile overlay backdrop */}
      {isMobile && (isSidebarOpen || isAiPanelOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-200"
          onClick={closeSidebarsOnMobile}
        />
      )}
    </div>
  );
}
