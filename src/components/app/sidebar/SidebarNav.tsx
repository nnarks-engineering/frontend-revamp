import { useState } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { cn } from "@/shared/lib/utils";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import {
  LayoutDashboard,
  LineChart,
  Briefcase,
  Wallet,
  Users,
  Inbox,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Bell,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  to: string;
  badge?: string | number;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
      { label: "Advisory", icon: LineChart, to: "/advisory" },
    ],
  },
  {
    title: "Escrow & Trust",
    items: [
      { label: "Projects", icon: Briefcase, to: "/projects" },
      { label: "Trust Circles", icon: Users, to: "/circles" },
      { label: "Escrow Ledger", icon: Wallet, to: "/escrow" },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Inbox", icon: Inbox, to: "/inbox", badge: 3 },
    ],
  },
];

interface SidebarNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

export function SidebarNav({ isCollapsed, onToggle, onClose }: SidebarNavProps) {
  const matchRoute = useMatchRoute();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-border/60 font-outfit transition-all duration-300 ease-in-out select-none",
        isCollapsed ? "w-[68px]" : "w-[252px]"
      )}
    >
      {/* Logo + Collapse Toggle */}
      <div className="flex items-center justify-between px-4 h-16 shrink-0 border-b border-border/40">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 group overflow-hidden transition-all duration-300",
            isCollapsed && "justify-center w-full"
          )}
        >
          <div className="relative shrink-0">
            <NnarksLogo className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
          </div>
          {!isCollapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-foreground whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
              Nnarks
            </span>
          )}
        </Link>

        {!isCollapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 hidden lg:flex"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 space-y-5 scrollbar-hide">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            {/* Group Title */}
            {group.title && !isCollapsed && (
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 px-2.5 mb-1.5">
                {group.title}
              </p>
            )}
            {group.title && isCollapsed && (
              <div className="w-5 h-px bg-border/60 mx-auto mb-2" />
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.to !== "/dashboard"
                  ? !!matchRoute({ to: item.to, fuzzy: true })
                  : item.label === "Dashboard" && !!matchRoute({ to: "/dashboard" });
                const isHovered = hoveredItem === item.label;

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] font-medium transition-all duration-150 group",
                      isCollapsed && "justify-center px-0 py-2.5",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                    )}

                    <Icon
                      className={cn(
                        "shrink-0 transition-all duration-150",
                        isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                        isHovered && !isActive && "scale-110"
                      )}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="ml-auto text-[11px] font-semibold leading-none bg-primary/15 text-primary px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip for collapsed mode */}
                    {isCollapsed && isHovered && (
                      <div className="absolute left-full ml-2.5 z-50 px-2.5 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-left-1 duration-150">
                        {item.label}
                        {item.badge && (
                          <span className="ml-1.5 text-primary-300">({item.badge})</span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section — User + Expand */}
      <div className="shrink-0 border-t border-border/40 p-2.5 space-y-1.5">
        {/* Notifications */}
        <button
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150",
            isCollapsed && "justify-center px-0 py-2.5"
          )}
        >
          <div className="relative shrink-0">
            <Bell className={cn("transition-all", isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]")} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-white" />
          </div>
          {!isCollapsed && <span>Notifications</span>}
        </button>

        {/* User Profile Row */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-2.5 py-2 bg-muted/40 hover:bg-muted/70 transition-all duration-150 cursor-pointer",
            isCollapsed && "justify-center px-0 py-2.5"
          )}
        >
          <div className={cn(
            "shrink-0 rounded-full bg-gradient-to-br from-primary via-primary-400 to-secondary flex items-center justify-center text-white text-xs font-bold",
            isCollapsed ? "w-8 h-8" : "w-7 h-7"
          )}>
            NK
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate">Nnarks User</p>
              <p className="text-[11px] text-muted-foreground truncate">user@nnarks.com</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-150">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Expand button (collapsed) */}
        {isCollapsed && (
          <button
            onClick={onToggle}
            className="w-full flex justify-center py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
            aria-label="Expand sidebar"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
