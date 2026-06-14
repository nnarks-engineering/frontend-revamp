import {
  Building2,
  ClipboardList,
  Droplets,
  Hammer,
  Layers,
  Lightbulb,
  Monitor,
  PaintBucket,
  TreePine,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { VendorServiceCategory } from "@/types";
import type { ServiceCategoryFilterItem } from "@/types/vendor/vendor.types";

/** Default service categories. Extend as the backend evolves. */
export const VENDOR_SERVICE_CATEGORIES: ServiceCategoryFilterItem[] = [
  { id: "ALL", label: "All Vendors", icon: Layers },
  { id: "CONSTRUCTION", label: "Construction", icon: Hammer },
  { id: "ENGINEERING", label: "Engineering", icon: Wrench },
  { id: "ARCHITECTURE", label: "Architecture", icon: Building2 },
  { id: "PLUMBING", label: "Plumbing", icon: Droplets },
  { id: "ELECTRICAL", label: "Electrical", icon: Zap },
  { id: "INTERIOR_DESIGN", label: "Interior Design", icon: PaintBucket },
  { id: "LANDSCAPING", label: "Landscaping", icon: TreePine },
  { id: "PROJECT_MANAGEMENT", label: "Project Mgmt", icon: ClipboardList },
  { id: "CONSULTING", label: "Consulting", icon: Lightbulb },
  { id: "IT_SERVICES", label: "IT Services", icon: Monitor },
  { id: "LOGISTICS", label: "Logistics", icon: Truck },
];

interface VendorServiceFilterProps {
 readonly activeCategory: VendorServiceCategory;
 readonly onCategoryChange: (category: VendorServiceCategory) => void;
 readonly className?: string;
}

/**
 * Sidebar filter for vendor service categories.
 * Renders vertically in a sidebar or horizontally when needed.
 */
export function VendorServiceFilter({
  activeCategory,
  onCategoryChange,
  className,
}: VendorServiceFilterProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 py-2">
        Services
      </h3>
      {VENDOR_SERVICE_CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onCategoryChange(id)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
