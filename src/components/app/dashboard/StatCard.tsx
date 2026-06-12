import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface StatCardProps {
  readonly value: string | number;
  readonly label: string;
  readonly trend?: "up" | "down";
  readonly href?: string;
  readonly onViewMore?: () => void;
  readonly className?: string;
}

export function StatCard({ value, label, trend, href, onViewMore, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-white shadow-xs",
        className,
      )}
    >
      {/* Body */}
      <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-3">
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
        </div>

        {trend && (
          <div
            className={cn(
              "mt-0.5 rounded-full p-1.5",
              trend === "up" && "bg-emerald-50 text-emerald-500",
              trend === "down" && "bg-red-50 text-red-500",
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="size-4" aria-hidden />
            ) : (
              <TrendingDown className="size-4" aria-hidden />
            )}
          </div>
        )}
      </div>

      {/* Footer button */}
      {href && (
        <Link
          to={href}
          className="mt-auto flex items-center justify-between bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          View More
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
      {!href && onViewMore && (
        <button
          type="button"
          onClick={onViewMore}
          className="mt-auto flex items-center justify-between bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          View More
          <ArrowRight className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
