import { cn } from "@/shared/lib/utils";

interface FilterTabsProps {
  tabs: string[];
  active: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

/**
 * Horizontal filter tabs used on list pages (projects, advisory, etc.).
 */
export function FilterTabs({ tabs, active, onTabChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
            active === tab
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
