import { cn } from "@/shared/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Consistent page header used across all dashboard pages.
 * Pass action buttons as children to render on the right side.
 */
export function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  return (
    <header className={cn("flex items-start justify-between flex-wrap gap-4", className)}>
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-[13px] text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
