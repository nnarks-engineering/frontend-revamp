import { getAllTopLevelItems, isOwnedBy } from "@/app/nav-config";

import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function TopNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = getAllTopLevelItems();

  return (
    <nav className="shrink-0  flex  pr-4 font-outfit items-center-safe border-b border-b-primary-300! ">
{/* <div className="hidden h-full md:block bg-primary- md:w-[220px] "></div> */}

      <div className="flex items-center gap-0   md:mx-auto w-fit  overflow-x-auto scrollbar-hide">
        {items.map((item) => {
          const isActive = isOwnedBy(pathname, item);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={item.to as any}
              className={cn(
                "relative h-full flex py-3 items-center gap-1.5 px-3.5 text-base font-medium",
                "whitespace-nowrap transition-colors duration-150 select-none",
                isActive
                  ? "text-black bg-primary-50"
                  : "text-primary-950 hover:text-foreground",
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-[15px] h-[15px] shrink-0 transition-colors duration-150",
                    isActive ? "text-primary-950" : "text-primary-950",
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
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-300 rounded-t-full"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      {/* <div className="hidden h-full md:block md:w-[220px] "></div> */}

    </nav>
  );
}
