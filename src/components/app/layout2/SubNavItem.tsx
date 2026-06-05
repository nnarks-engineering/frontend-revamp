import { findBestMatchId, isOwnedBy, type NavItem } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SubNavItemProps {
  item: NavItem;
  depth?: number;
}

export function SubNavItem({ item, depth = 0 }: Readonly<SubNavItemProps>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isSectionActive = isOwnedBy(pathname, item);
  const isDirectlyActive = findBestMatchId([item], pathname) === item.id;
  const hasChildren = !!item.children?.length;

  const [open, setOpen] = useState(isSectionActive);

  const itemBase = cn(
    "w-full flex items-center gap-2.5 rounded-lg text-sm transition-colors duration-150 select-none",
    depth === 0 ? "px-3 py-2" : "px-2.5 py-1.5 text-[13px]",
  );

  const activeLeafClass = "bg-active-background text-active-foreground font-medium";
  const inactiveClass = "text-muted-foreground hover:text-foreground hover:bg-muted/40";

  // ── Leaf item (no children) ───────────────────────────────────────────────
  if (!hasChildren) {
    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={item.to as never}
        className={cn(itemBase, isDirectlyActive ? activeLeafClass : inactiveClass)}
      >
        {item.icon && (
          <FontAwesomeIcon
            icon={item.icon}
            className={cn(
              "shrink-0",
              depth === 0 ? "w-3.5 h-3.5" : "w-3 h-3",
              isDirectlyActive ? "text-active-foreground" : "text-muted-foreground/60",
            )}
          />
        )}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  // ── Accordion item (has children) ────────────────────────────────────────
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          itemBase,
          "justify-between group",
          isSectionActive ? "text-foreground" : inactiveClass,
        )}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          {item.icon && (
            <FontAwesomeIcon
              icon={item.icon}
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                isSectionActive ? "text-active-foreground" : "text-muted-foreground/60",
              )}
            />
          )}
          <span className="truncate">{item.label}</span>
        </span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className={cn(
            "w-3 h-3 shrink-0 transition-transform duration-200 text-muted-foreground/50",
            open && "rotate-90",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-border/50 py-0.5 space-y-0.5">
              {(item.children ?? []).map((child) => (
                <SubNavItem key={child.id} item={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
