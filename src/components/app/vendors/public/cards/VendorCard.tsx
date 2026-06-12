import { BadgeCheck, Star, MapPin } from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { Image } from "@/components/image/Image";
import { cn } from "@/shared/lib/utils";
import type { VendorItem } from "@/types/vendors";

interface VendorCardProps {
  vendor: VendorItem;
  onClick?: (vendor: VendorItem) => void;
  className?: string;
}

/**
 * A rich vendor card — banner, logo, name, services, rating, location.
 * Reusable across marketplace, search results, and dashboard widgets.
 */
export function VendorCard({ vendor, onClick, className }: VendorCardProps) {
  return (
    <div
      onClick={() => onClick?.(vendor)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer",
        className,
      )}
    >
      {/* ── Banner ────────────────────────────────────────────────── */}
      <div className="relative h-28 shrink-0 overflow-hidden bg-gradient-to-br from-primary/80 to-primary/40">
        {vendor.banner_url ? (
          <img
            src={vendor.banner_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <RoundingLine className="absolute -top-6 left-0 text-white/10 scale-x-[-1] pointer-events-none" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Verified badge */}
        {vendor.is_verified && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-emerald-700 shadow-sm">
            <BadgeCheck className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col px-4 pb-4 pt-0 relative">
        {/* Logo */}
        <div className="relative -mt-7 mb-2.5 self-start">
          <div className="p-0.5 rounded-xl bg-background shadow-sm border border-border/60">
            <Image
              src={vendor.logo_url}
              alt={vendor.name}
              fullName={vendor.name}
              className="h-12 w-12 rounded-[10px] object-cover"
            />
          </div>
        </div>

        {/* Name + location */}
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors truncate">
            {vendor.name}
          </h3>
          {vendor.location && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              {vendor.location}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {vendor.description}
        </p>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {vendor.services.slice(0, 3).map((service) => (
            <span
              key={service.id}
              className="inline-flex items-center text-[10px] font-medium bg-primary/8 text-primary px-2 py-0.5 rounded-md"
            >
              {service.name}
            </span>
          ))}
          {vendor.services.length > 3 && (
            <span className="inline-flex items-center text-[10px] font-medium text-muted-foreground px-1.5 py-0.5">
              +{vendor.services.length - 3} more
            </span>
          )}
        </div>

        {/* Rating + reviews */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/30">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-foreground">{vendor.rating}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({vendor.review_count} review{vendor.review_count !== 1 ? "s" : ""})
          </span>
        </div>
      </div>
    </div>
  );
}
