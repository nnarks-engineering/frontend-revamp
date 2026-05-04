import { cn } from "@/shared/lib/utils";

interface ProgressDotsProps {
  total: number;
  completed: number;
  className?: string;
}

/**
 * Visual dot progress indicator for milestone completion.
 */
export function ProgressDots({ total, completed, className }: ProgressDotsProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i < completed ? "bg-primary" : "border border-border bg-transparent"
          )}
        />
      ))}
    </div>
  );
}
