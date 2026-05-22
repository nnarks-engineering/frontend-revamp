import { getAllTopLevelItems, isOwnedBy } from "@/app/nav-config";
import { SidebarCompanySwitcher } from "@/components/app/sidebar/SidebarCompanySwitcher";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function TopNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = getAllTopLevelItems();

  return (
    <nav className="shrink-0  flex  pr-4 font-outfit">
      <div className="w-[220px] shrink-0  ">
        <SidebarCompanySwitcher isCollapsed={false} />
      </div>

      <div className="flex flex-1 items-end gap-0  overflow-x-auto scrollbar-hide border-b">
        {items.map((item) => {
          const isActive = isOwnedBy(pathname, item);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={item.to as any}
              className={cn(
                "relative h-full flex items-center gap-1.5 px-3.5 text-sm font-medium",
                "whitespace-nowrap transition-colors duration-150 select-none",
                isActive
                  ? "text-primary"
                  : "text-primary-950 hover:text-foreground",
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-[15px] h-[15px] shrink-0 transition-colors duration-150",
                    isActive ? "text-primary" : "text-primary-950",
                  )}
                />
              )}

              {item.label}

              {item.badge && (
                <span className="text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.span
                  layoutId="topnav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
