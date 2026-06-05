import { getAllTopLevelItems } from "@/app/nav-config-si";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarUserMenu } from "@/components/app/sidebar/SidebarUserMenu";
import NnarksLogo from "@/assets/nnarks-logo-sm.svg?react";
import { Link } from "@tanstack/react-router";
import { IconRailItem } from "./IconRailItem";

interface IconRailProps {
  subPanelOpen?: boolean;
}

export function IconRail({ subPanelOpen = false }: Readonly<IconRailProps>) {
  const items = getAllTopLevelItems();

  return (
    <TooltipProvider>
      {/* Dark teal narrow icon column */}
      <aside className="w-14 shrink-0 h-full bg-primary-950 flex flex-col items-center py-3 z-20">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center justify-center w-9 h-9 mb-3 shrink-0 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="Home"
        >
          <NnarksLogo className="w-6 h-6 text-white" />
        </Link>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10 mb-3 shrink-0" />

        {/* Nav icon buttons */}
        <nav className="flex-1 flex flex-col items-center gap-1 w-full overflow-y-auto scrollbar-hide py-1">
          {items.map((item) => (
            <IconRailItem key={item.id} item={item} subPanelOpen={subPanelOpen} />
          ))}
        </nav>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10 mt-2 mb-2 shrink-0" />

        {/* User menu at bottom */}
        <div className="shrink-0">
          <SidebarUserMenu />
        </div>
      </aside>
    </TooltipProvider>
  );
}
