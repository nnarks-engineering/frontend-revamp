import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Empty state placeholder used when a list or section has no data.
 */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-8 text-center", className)}>
      <div className="mb-4 flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center">
          <Icon className="w-7 h-7 text-muted-foreground/60" />
        </div>
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
