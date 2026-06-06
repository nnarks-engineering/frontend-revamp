import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  title?: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export function ProjectTypeButton({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  className,
  iconClassName,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex rounded-md transition-all  max-h-24  overflow-clip",
        selected
          ? "border-primary bg-primary-bg ring-1 ring-offset-3 ring-active"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100 grayscale-100",
        className
      )}
    >
      <div className={cn(
        "h-full w-24 flex transition-colors bg-red-300",
        selected ? "bg-primary-bg-hover text-white" : "bg-primary-bg-hover text-muted-foreground",
        iconClassName
      )}>
        <Icon className="w-24 h-24" />
      </div>
      <div className="text-left p-2">
        {title && <h3 className="font-semibold text-primary-fg mb-1 font-millik">{title}</h3>}
        {description && <p className="text-xs text-primary-fg-hover">{description}</p>}
      </div>
    </button>
  );
}
