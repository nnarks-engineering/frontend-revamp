import { Loader2 } from "lucide-react";
import { VendorCard } from "../cards/VendorCard";
import { EmptyState } from "@/components/app/shared";
import type { VendorItem } from "@/types/vendors";

interface VendorGridProps {
  vendors: VendorItem[];
  isLoading?: boolean;
  onVendorClick?: (vendor: VendorItem) => void;
}

/**
 * Responsive grid of vendor cards with loading and empty states.
 * Uses container queries for layout adaptation.
 */
export function VendorGrid({ vendors, isLoading, onVendorClick }: VendorGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <EmptyState
        title="No vendors found"
        description="There are no vendors matching this service category yet."
        className="py-20"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 gap-4 p-4 @md:p-6">
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
          onClick={onVendorClick}
        />
      ))}
    </div>
  );
}
