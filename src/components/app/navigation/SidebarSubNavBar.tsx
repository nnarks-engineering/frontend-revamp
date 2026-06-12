import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import { findBestMatchId, resolveVerticalSidebarItems } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";

export function SidebarSubNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = resolveVerticalSidebarItems(pathname);
  const activeId = items ? findBestMatchId(items, pathname) : null;

  return (
    <AnimatePresence initial={false}>
      {items && items.length > 0 && (
        <motion.nav
          key="sidebar-subnav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="lg:hidden shrink-0 border-b border-border/40 bg-background px-2 overflow-hidden"
        >
          <div className="flex h-10 items-center gap-1 overflow-x-auto scrollbar-hide">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <Link
                  key={item.id}
                  to={item.to as never}
                  className={cn(
                    "h-8 rounded-lg px-3 text-xs font-medium whitespace-nowrap",
                    "inline-flex items-center transition-colors duration-150",
                    isActive
                      ? "bg-primary/10 text-active"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
