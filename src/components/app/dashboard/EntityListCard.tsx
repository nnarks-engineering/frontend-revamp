import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface EntityItem {
  id: string;
  name: string;
  avatarUrl?: string;
  initials?: string;
}

interface EntityGroup {
  label: string;
  items: EntityItem[];
}

interface EntityListCardProps {
  title: string;
  viewAllLink?: string;
  groups: EntityGroup[];
  className?: string;
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function EntityListCard({ title, viewAllLink, groups, className }: EntityListCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-xs border border-border/40 h-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-foreground tracking-wide">
          {title}
        </h3>
        {viewAllLink && (
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to={viewAllLink as any}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-2 flex-1">
        {groups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className={cn(
              "flex flex-col gap-1.5 p-3 rounded-xl",
              groupIdx % 2 === 0 ? "bg-muted/30" : "bg-muted/10"
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
            <div className="flex items-center">
              {/* Avatar Stack */}
              <div className="flex items-center -space-x-2">
                {group.items.slice(0, 5).map((item, i) => (
                  <div
                    key={item.id}
                    className="w-7 h-7 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary shadow-sm relative z-10 hover:z-20 transition-transform hover:scale-110 cursor-default"
                    title={item.name}
                    style={{ zIndex: 10 - i }}
                  >
                    {item.avatarUrl ? (
                      <img src={item.avatarUrl} alt={item.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      item.initials || getInitials(item.name)
                    )}
                  </div>
                ))}
              </div>
              
              {/* Remaining Count */}
              {group.items.length > 5 && (
                <span className="text-xs font-medium text-muted-foreground ml-3">
                  +{group.items.length - 5}
                </span>
              )}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-6">
            <span className="text-sm text-muted-foreground">No records found.</span>
          </div>
        )}
      </div>
    </div>
  );
}
