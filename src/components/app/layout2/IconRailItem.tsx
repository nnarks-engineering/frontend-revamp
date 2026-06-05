import { isOwnedBy, type NavItem } from "@/app/nav-config";
import { cn } from "@/shared/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconRailItemProps {
  item: NavItem;
  subPanelOpen?: boolean;
}

export function IconRailItem({ item, subPanelOpen = false }: Readonly<IconRailItemProps>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = isOwnedBy(pathname, item);
  const hasChildren = !!item.children?.length;
  // Suppress all tooltips whenever the sub-nav panel is open
  const suppressTooltip = subPanelOpen;

  const buttonClass = cn(
    "relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150",
    isActive
      ? "bg-primary/25 text-primary-200"
      : "text-white/40 hover:text-white hover:bg-white/10",
  );

  const tooltipBody = hasChildren ? (
    // Rich flyout: title + list of direct children
    <div className="min-w-35">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
        {item.label}
      </p>
      <ul className="space-y-0.5">
        {(item.children ?? []).map((child) => (
          <li key={child.id}>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={child.to as never}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-foreground/80 hover:bg-muted/60 hover:text-foreground transition-colors duration-100"
            >
              {child.icon && (
                <FontAwesomeIcon
                  icon={child.icon}
                  className="w-3 h-3 shrink-0 text-muted-foreground"
                />
              )}
              <span>{child.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    // Simple label tooltip
    <span>{item.label}</span>
  );

  return (
    <Tooltip delayDuration={150} open={suppressTooltip ? false : undefined}>
      <TooltipTrigger asChild>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={item.to as never}
          aria-label={item.label}
          className={buttonClass}
        >
          {/* Active left-edge indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-primary-300 rounded-r-full" />
          )}

          {item.icon && (
            <FontAwesomeIcon icon={item.icon} className="w-4.5 h-4.5" />
          )}

          {/* Badge (e.g. unread count) */}
          {item.badge && (
            <span className="absolute top-1 right-1 min-w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold bg-destructive text-white rounded-full px-0.5 leading-none">
              {item.badge}
            </span>
          )}
        </Link>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        sideOffset={10}
        className={cn(
          "bg-popover text-popover-foreground border border-border shadow-lg",
          hasChildren ? "p-3 rounded-xl" : "px-3 py-1.5 rounded-lg",
        )}
      >
        {tooltipBody}
      </TooltipContent>
    </Tooltip>
  );
}
