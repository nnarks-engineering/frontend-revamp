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
          ? "border-primary bg-primary-bg ring-1 ring-offset-3 ring-offset-background  ring-active  hue-rotate-270"
          : "bg-primary-bg border-gray-200  group",
        className
      )}
    >
      <div className={cn(
        "h-full w-24 flex transition-colors",
        selected ? "bg-primary-bg-hover text-white" : "bg-primary-bg-hover text-muted-foreground",
        iconClassName
      )}>
        <Icon className="w-24 h-24 group-hover:scale-105 transition-transform" />
      </div>
      <div className="text-left p-2 flex-1 flex flex-col justify-center">
        {title && <h3 className="font-semibold text-primary-fg mb-1 font-millik">{title}</h3>}
        {description && <p className="text-xs text-primary-fg-hover">{description}</p>}
      </div>
    </button>
  );
}
