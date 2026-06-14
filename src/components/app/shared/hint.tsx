import type { LucideIcon } from "lucide-react";
import { Info } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface HintProps {
  title?: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  className?: string;
}

export function Hint({
  description,
  title,
  icon: Icon = Info,
  className,
}: HintProps) {
  return (
    <div className={cn("bg-tertiary-bg p-4 rounded-lg flex gap-3", className)}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5 text-tertiary-fg-hover" />
      <div className="flex flex-col gap-0.5">
        {title && (
          <p className="text-xs font-semibold text-tertiary-fg-hover">{title}</p>
        )}
        <p className="text-xs text-tertiary-fg-hover">{description}</p>
      </div>
    </div>
  );
}
