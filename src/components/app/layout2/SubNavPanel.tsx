import { useState } from "react";

import { useRouterState } from "@tanstack/react-router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { resolvePageTitle, type NavItem } from "@/app/nav-config-si";
import { cn } from "@/shared/lib/utils";

import { SubNavItem } from "./SubNavItem";

interface SubNavPanelProps {
  items: NavItem[];
}

export function SubNavPanel({ items }: Readonly<SubNavPanelProps>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = resolvePageTitle(pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "shrink-0 h-full bg-background border-r border-border/50 flex flex-col relative transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 border-r-0" : "w-55",
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute top-5 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-background-space! hover:opacity-90 transition-all",isCollapsed ? "bg-primary-fg" : "bg-background",
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <PanelLeftOpen className="size-4 text-background" /> : <PanelLeftClose className="h-3.5 w-3.5 text-primary-fg-hover" />}
      </button>

      {/* Panel Content (hidden when collapsed to prevent layout breaks) */}
      <div
        className={cn(
          "flex flex-col h-full w-55 overflow-hidden transition-opacity duration-300",
          isCollapsed ? "opacity-0 invisible" : "opacity-100 visible",
        )}
      >
        {/* Section title */}
        <div className="px-4 py-4 border-b border-border/40 shrink-0">
          <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2.5 px-2 space-y-0.5 scrollbar-hide">
          {items.map((item) => (
            <SubNavItem key={item.id} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
