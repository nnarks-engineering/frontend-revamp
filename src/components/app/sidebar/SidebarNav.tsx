import { NAV_GROUPS, isUnder, type NavItem } from "@/app/nav-config";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { SidebarCompanySwitcher } from "./SidebarCompanySwitcher";
import { SidebarUserMenu } from "./SidebarUserMenu";

interface SidebarNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

export function SidebarNav({ isCollapsed, onToggle, onClose }: SidebarNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-border/60 font-outfit transition-all duration-300 ease-in-out select-none",
        isCollapsed ? "w-[68px]" : "w-[252px]",
      )}
    >
      {/* Logo + Collapse Toggle */}
      <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-border/40">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 group overflow-hidden transition-all duration-300",
            isCollapsed && "justify-center w-full",
          )}
        >
          <div className="relative shrink-0">
            <NnarksLogo className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
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

      {/* Company Switcher */}
      <div className="px-2.5 py-2 border-b border-border/40">
        <SidebarCompanySwitcher isCollapsed={isCollapsed} />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 space-y-5 scrollbar-hide">
        {NAV_GROUPS.map((group, groupIdx) => (
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
              {group.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  hoveredItem={hoveredItem}
                  onHover={setHoveredItem}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-border/40 p-2.5 space-y-1.5">
        <button
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150",
            isCollapsed && "justify-center px-0 py-2.5",
          )}
        >
          <div className="relative shrink-0">
            <Bell
              className={cn(
                "transition-all",
                isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
              )}
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-white" />
          </div>
          {!isCollapsed && <span>Notifications</span>}
        </button>

        <SidebarUserMenu isCollapsed={isCollapsed} />

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

// ─── SidebarItem ─────────────────────────────────────────────────────────────

interface SidebarItemProps {
  item: NavItem;
  pathname: string;
  isCollapsed: boolean;
  hoveredItem: string | null;
  onHover: (id: string | null) => void;
  onClose?: () => void;
}

function SidebarItem({
  item,
  pathname,
  isCollapsed,
  hoveredItem,
  onHover,
  onClose,
}: SidebarItemProps) {
  const Icon = item.icon;
  const isActive = isUnder(pathname, item.to);
  const isHovered = hoveredItem === item.id;

  // Vertical children are shown when this item is active and the sidebar is expanded
  const hasVerticalChildren =
    item.childrenLayout === "vertical-sidebar" && !!item.children?.length;
  const showChildren = hasVerticalChildren && isActive && !isCollapsed;

  return (
    <div>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={item.to as any}
        onClick={onClose}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        className={cn(
          "relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] font-medium transition-all duration-150 group",
          isCollapsed && "justify-center px-0 py-2.5",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
        )}

        {Icon && (
          <Icon
            className={cn(
              "shrink-0 transition-all duration-150",
              isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
              isActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground",
              isHovered && !isActive && "scale-110",
            )}
          />
        )}

        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>

            {item.badge && (
              <span className="text-[11px] font-semibold leading-none bg-primary/15 text-primary px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}

            {/* Expand chevron for vertical-sidebar items */}
            {hasVerticalChildren && (
              <ChevronRight
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground/60 transition-transform duration-200",
                  isActive && "rotate-90",
                )}
              />
            )}
          </>
        )}

        {/* Tooltip for collapsed mode */}
        {isCollapsed && isHovered && (
          <div className="absolute left-full ml-2.5 z-50 px-2.5 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-left-1 duration-150">
            {item.label}
            {item.badge && (
              <span className="ml-1.5 opacity-70">({item.badge})</span>
            )}
          </div>
        )}
      </Link>

      {/* Vertical children — animate height on expand/collapse */}
      <AnimatePresence initial={false}>
        {showChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-0.5 mb-1 pl-3 border-l border-border/50 space-y-0.5">
              {item.children!.map((child) => {
                const childActive = isUnder(pathname, child.to);
                return (
                  <Link
                    key={child.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={child.to as any}
                    onClick={onClose}
                    className={cn(
                      "block px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors duration-150",
                      childActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    )}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
