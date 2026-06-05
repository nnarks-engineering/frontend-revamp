import { resolvePageTitle, type NavItem } from "@/app/nav-config";
import { useRouterState } from "@tanstack/react-router";
import { SubNavItem } from "./SubNavItem";

interface SubNavPanelProps {
  items: NavItem[];
}

export function SubNavPanel({ items }: SubNavPanelProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = resolvePageTitle(pathname);

  return (
    <aside className="w-55 shrink-0 h-full bg-background border-r border-border/50 flex flex-col">
      {/* Section title */}
      <div className="px-4 py-4 border-b border-border/40 shrink-0">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2.5 px-2 space-y-0.5 scrollbar-hide">
        {items.map((item) => (
          <SubNavItem key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
}
