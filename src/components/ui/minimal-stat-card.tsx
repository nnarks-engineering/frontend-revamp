import { cn } from "@/shared/lib/utils";
import * as React from "react";

export interface MinimalStatCardProps extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  action?: React.ReactNode;
}

export const MinimalStatCard = React.forwardRef<HTMLElement, MinimalStatCardProps>(
  ({ label, value, action, className, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "rounded-lg @container p-4 @md:p-6 group  min-h-30 flex flex-col justify-between odd:bg-primary-bg even:bg-tertiary-bg",
          className
        )}
        {...props}
      >
        <p className="text-base leading-tight font-medium tracking-tight group-even:text-tertiary-fg group-odd:text-primary-fg">
          {label}
        </p>
        <div className="flex items-end justify-between gap-4 pt-6">
          <p className="text-2xl leading-none font-semibold font-millik text-foreground overflow-clip group-even:text-tertiary-fg-hover group-odd:text-primary-fg-hover">
            {value}
          </p>
          {action && (
            <div className="pb-1.5 flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      </article>
    );
  }
);
MinimalStatCard.displayName = "MinimalStatCard";
