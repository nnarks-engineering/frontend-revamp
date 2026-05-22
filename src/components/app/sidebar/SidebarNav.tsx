import { findBestMatchId, isOwnedBy, resolveVerticalSidebarItems, type NavItem } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarNavProps {
  onClose?: () => void;
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sidebarItems = resolveVerticalSidebarItems(pathname);

  const activeSidebarId = findBestMatchId(sidebarItems ?? [], pathname);

  return (
    <aside className="h-full w-[220px] flex flex-col md:bg-background rounded-r-2xl font-poppins select-none">
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 scrollbar-hide">
        {sidebarItems?.length ? (
          <div className="space-y-0.5">
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
  // isSectionActive: any descendant route is active → keeps accordion open
  const isSectionActive = isOwnedBy(pathname, item);
  const hasChildren = !!item.children?.length;

  // Active route always keeps the accordion open.
  // The user can additionally open non-active accordions manually via the chevron.
  const [manualOpen, setManualOpen] = useState(false);
  const isOpen = isSectionActive || manualOpen;

  // ── Leaf item (no children) ─────────────────────────────────────────────
  if (!hasChildren) {
    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={item.to as any}
        onClick={onClose}
        className={cn(
          "relative flex items-center px-3 py-2  rounded-r-md",
          "transition-all duration-150",
          isDirectlyActive
            ? "bg-primary/10  border-l-2 border-l-primary!"
            : "text-black hover:text-foreground hover:bg-muted/50",
        )}
      >
        {/* {isDirectlyActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary" />
        )} */}
        {item.icon && <item.icon className={cn("w-4 h-4 shrink-0 mr-3", isDirectlyActive ? "text-primary" : "text-muted-foreground/70")} />}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  // Most-specific child match — only the deepest matching child is highlighted
  const activeChildId = findBestMatchId(item.children!, pathname);

  // ── Accordion item (has children) ──────────────────────────────────────
  return (
    <div>
      {/* Parent row: Link navigates, chevron button toggles */}
      <div
        className={cn(
          "relative flex items-center ",
          "transition-all duration-150 group rounded-r-md",
          isDirectlyActive
            ? "bg-primary/10  border-l-2 border-l-primary!"
            : " hover:text-foreground hover:bg-muted/50",
        )}
      >
        {/* {isDirectlyActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-primary" />
        )} */}
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={item.to as any}
          onClick={onClose}
          className="flex-1 flex items-center px-3 py-2 truncate"
        >
          {item.icon && <item.icon className="w-4 h-4 shrink-0 mr-3 text-muted-foreground/70" />}
          <span className="truncate">{item.label}</span>
        </Link>
        <button
          onClick={() => setManualOpen((o) => !o)}
          className="p-2 shrink-0 "
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <ChevronRight
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen ? "rotate-90" : "",
              isDirectlyActive
                ? " group-hover:"
                : " group-hover:text-muted-foreground/70",
            )}
          />
        </button>
      </div>

      {/* Accordion children */}
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
                      "relative flex items-center px-3 py-1.5 rounded-r-md ",
                      "transition-all duration-150",
                      childActive
                        ? "bg-primary/8 "
                        : " hover:text-foreground hover:bg-muted/40",
                    )}
                  >

                    {child.icon && <child.icon className={cn("w-3.5 h-3.5 shrink-0 mr-2", childActive ? "text-primary" : "text-muted-foreground/60")} />}
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
