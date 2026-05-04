import { cn } from "@/shared/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  dotColor?: string;
  valueColor?: string;
  className?: string;
}

/**
 * Financial metric card — used in dashboard and escrow summary.
 */
export function MetricCard({ label, value, dotColor, valueColor, className }: MetricCardProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 px-6 py-5", className)}>
      <div className="flex items-center gap-2">
        {dotColor && <div className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} />}
        <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      <span
        className={cn(
          "font-geist text-2xl leading-none font-bold tracking-tight",
          valueColor ?? "text-foreground/80"
        )}
      >
        {value}
      </span>
    </div>
  );
}
