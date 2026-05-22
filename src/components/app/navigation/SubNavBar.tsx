import {
    resolveActiveTabId,
    resolveHorizontalTabs,
} from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export function SubNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabs = resolveHorizontalTabs(pathname);
  const activeId = tabs ? resolveActiveTabId(tabs, pathname) : null;

  return (
    <AnimatePresence initial={false}>
      {tabs && tabs.length > 0 && (
        <motion.nav
          key="subnav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="shrink-0 bg-white border-b border-border/40 px-4 font-outfit overflow-hidden"
        >
          <div className="flex items-end gap-0 h-10 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <Link
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={tab.to as any}
                  className={cn(
                    "relative h-full flex items-center px-3.5 text-[13px] font-medium whitespace-nowrap",
                    "transition-colors duration-150 select-none",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="subnav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
