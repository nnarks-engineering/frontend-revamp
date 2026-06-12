import { Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface VendorSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Stylized search bar for the vendor marketplace.
 */
export function VendorSearchBar({ value, onChange, className }: VendorSearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search vendors by name, service..."
        className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/40 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
      />
    </div>
  );
}
