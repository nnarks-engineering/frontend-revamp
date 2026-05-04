import { cn } from "@/shared/lib/utils";

interface SectionDividerProps {
  label: string;
  badge?: number;
  className?: string;
}

/**
 * Section divider with a label and optional count badge.
 * Matches the pattern from the old frontend.
 */
export function SectionDivider({ label, badge, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 whitespace-nowrap">
        {label}
      </span>
      {badge !== undefined && (
        <span className="bg-warning/15 text-warning flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold">
          {badge}
        </span>
      )}
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}
