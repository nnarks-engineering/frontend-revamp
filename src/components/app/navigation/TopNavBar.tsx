import { getAllTopLevelItems, isOwnedBy } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TopNavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = getAllTopLevelItems();

  return (
    <nav className="shrink-0 flex pr-4 items-center h-full border-r border-background-space!">
      <div className="flex items-stretch gap-0 mt-auto md:mx-auto h-full w-fit overflow-x-auto scrollbar-hide">
        {items.map((item) => {
          const isActive = isOwnedBy(pathname, item);

          return (
            <Link
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={item.to as any}
              className={cn(
                "relative flex items-center justify-center sm:justify-end gap-0.5 pb-1 mx-3 text-xs font-normal",
                "whitespace-nowrap transition-colors duration-150 select-none",
                isActive
                  ? "text-active-foreground"
                  : "text-muted-foreground/80 bg-slate- hover:text-foreground",
              )}
            >
              {item.icon && (
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-xl shrink-0 transition-colors duration-150"
                />
              )}
              <span className="hidden sm:flex">{item.label}</span>

              {item.badge && (
                <span className="text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.span
                  layoutId="topnav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-active-foreground rounded-t-full"
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
