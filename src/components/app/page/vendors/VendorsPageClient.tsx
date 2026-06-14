import { Plus, Store } from "lucide-react";
import { useMemo, useState } from "react";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import {
  VENDOR_SERVICE_CATEGORIES,
  VendorGrid,
  VendorSearchBar,
  VendorServiceFilter,
} from "@/components/app/vendors/public";
import { Button } from "@/components/ui/button";
import {
  ModuleLayout,
  ModuleLayoutDescription,
  ModuleLayoutHeader,
  ModuleLayoutHeaderActions,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
} from "@/components/ui/module-layout";
import { useVendors } from "@/shared/hooks/vendor/use-vendors";
import type { VendorServiceCategory } from "@/types";
import type { VendorItem } from "@/types/vendor/vendor.types";


/**
 * Vendors / Marketplace page client — dashboard flow.
 * Left sidebar filter + responsive vendor card grid with container queries.
 */
export function VendorsPageClient() {
  const [activeCategory, setActiveCategory] = useState<VendorServiceCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: vendors = [], isLoading } = useVendors(activeCategory);

  const activeCategoryLabel = useMemo(
    () => VENDOR_SERVICE_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "All Vendors",
    [activeCategory],
  );

  // Client-side search filter
  const filteredVendors = useMemo(() => {
    if (!searchQuery.trim()) return vendors;
    const q = searchQuery.toLowerCase();
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.services.some((s) => s.name.toLowerCase().includes(q)),
    );
  }, [vendors, searchQuery]);

  const handleVendorClick = (_vendor: VendorItem) => {
    // TODO: Navigate to vendor detail page
    // console.log("View vendor:", _vendor.slug);
  };

  return (
    <div className="space-y-6 max-w-350 mx-auto @container bg-background-space p-4 @md:p-6">
      {/* ── Header ── */}
      <ModuleLayout>
        <ModuleLayoutHeader variant="primary">
          <RoundingLine
            className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none"
            aria-hidden
          />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <ModuleLayoutHeaderContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <ModuleLayoutTitle>Marketplace</ModuleLayoutTitle>
                <ModuleLayoutDescription>
                  Discover verified vendors and service providers for your projects.
                </ModuleLayoutDescription>
              </div>
            </div>
          </ModuleLayoutHeaderContent>
          <ModuleLayoutHeaderActions>
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              List Your Service
            </Button>
          </ModuleLayoutHeaderActions>
        </ModuleLayoutHeader>

        {/* ── Content: sidebar + grid ── */}
        <div className="flex flex-col @2xl:flex-row min-h-125">
          {/* Sidebar filter */}
          <aside className="shrink-0 @2xl:w-56 @2xl:border-r border-b @2xl:border-b-0 border-border/40 p-3 @2xl:py-4">
            <VendorServiceFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              className="@2xl:flex-col flex-row flex-wrap @2xl:flex-nowrap"
            />
          </aside>

          {/* Main area */}
          <div className="flex-1 min-w-0 @container">
            {/* Toolbar */}
            <div className="flex flex-col @md:flex-row items-start @md:items-center gap-3 p-4 @md:px-6 border-b border-border/40">
              <h2 className="text-lg font-bold text-foreground whitespace-nowrap">
                {activeCategoryLabel}
              </h2>
              <VendorSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1 w-full @md:max-w-xs"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Vendor grid */}
            <VendorGrid
              vendors={filteredVendors}
              isLoading={isLoading}
              onVendorClick={handleVendorClick}
            />
          </div>
        </div>
      </ModuleLayout>
    </div>
  );
}
