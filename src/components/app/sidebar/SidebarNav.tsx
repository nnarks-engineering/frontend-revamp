import { findBestMatchId, isOwnedBy, resolveVerticalSidebarItems, resolvePageTitle, type NavItem } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SidebarNavProps {
  onClose?: () => void;
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sidebarItems = resolveVerticalSidebarItems(pathname);

  const activeSidebarId = findBestMatchId(sidebarItems ?? [], pathname);
  const mainTabLabel = resolvePageTitle(pathname);

  return (
    <aside className="h-full w-[220px] mt-4 flex flex-col bg-background border-none border-primary-300! border-l-0 border-t-0 rounded-r-2xl select-none">
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 scrollbar-hide">
        {sidebarItems?.length ? (
          <div className="space-y-0.5 text-sm">
            <div className="px-3 pb-2 pt-1 text-sm font-millik text-muted-foreground/50 uppercase tracking-wider select-none">
              {mainTabLabel}
            </div>
            {sidebarItems.map((item) => (
              <SidebarSubItem
                key={item.id}
                item={item}
                pathname={pathname}
                isDirectlyActive={item.id === activeSidebarId}
                onClose={onClose}
              />
            ))}
          </div>
        ) : null}
      </nav>
    </aside>
  );
}

// ─── SidebarSubItem ───────────────────────────────────────────────────────────

interface SidebarSubItemProps {
  item: NavItem;
  pathname: string;
  isDirectlyActive: boolean;
  onClose?: () => void;
}

function SidebarSubItem({ item, pathname, isDirectlyActive, onClose }: SidebarSubItemProps) {
  const isSectionActive = isOwnedBy(pathname, item);
  const hasChildren = !!item.children?.length;

  const [manualOpen, setManualOpen] = useState(false);
  const isOpen = isSectionActive || manualOpen;

  const activeClass = isDirectlyActive
    ? "bg-active-background border-l-2 border-l-primary! text-active-foreground"
    : "text-muted-foreground hover:text-foreground";
    const inactiveIconClass = "text-muted-foreground hover:text-foreground";

  // ── Leaf item (no children) ─────────────────────────────────────────────
  if (!hasChildren) {
    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={item.to as any}
        onClick={onClose}
        className={cn(
          "relative flex items-center px-3 py-2 rounded-r-md",
          "transition-all duration-150",
          isDirectlyActive
            ? activeClass
            : inactiveIconClass,
        )}
      >
        {item.icon && (
          <FontAwesomeIcon
            icon={item.icon}
            className={cn("w-4 h-4 shrink-0 mr-3", isDirectlyActive ? "" : "tex")}
          />
        )}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  const activeChildId = findBestMatchId(item.children!, pathname);

  // ── Accordion item (has children) ──────────────────────────────────────
  return (
    <div>
      <div
        className={cn(
          "relative flex items-center",
          "transition-all duration-150 group rounded-r-md",
          isDirectlyActive
            ? activeClass : inactiveIconClass,
        )}
      >
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={item.to as any}
          onClick={onClose}
          className="flex-1 flex items-center px-3 py-2 truncate"
        >
          {item.icon && (
            <FontAwesomeIcon
              icon={item.icon}
              className="w-4 h-4 shrink-0 mr-3"
            />
          )}
          <span className="truncate">{item.label}</span>
        </Link>
        <button
        type="button"
          onClick={() => setManualOpen((o) => !o)}
          className="p-2 shrink-0"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen ? "rotate-90" : "",
              isDirectlyActive
                ? "group-hover:"
                : "group-hover:text-muted-foreground/70",
            )}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pl-3 py-1 space-y-0.5">
              {item.children!.map((child) => {
                const childActive = child.id === activeChildId;
                return (
                  <Link
                    key={child.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={child.to as any}
                    onClick={onClose}
                    className={cn(
                      "relative flex items-center px-3 py-1.5 rounded-r-md",
                      "transition-all duration-150",
                      childActive
                        ? "bg-active-background text-active-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {child.icon && (
                      <FontAwesomeIcon
                        icon={child.icon}
                        className={cn("w-3.5 h-3.5 shrink-0 mr-2", childActive ? "text-primary" : "text-muted-foreground/60")}
                      />
                    )}
                    <span className="truncate">{child.label}</span>
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
