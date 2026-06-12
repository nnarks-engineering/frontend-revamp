import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Shield,
  ShieldAlert,
} from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { Button } from "@/components/ui/button";
import { useMyServices } from "@/shared/hooks/use-services";
import type { Service } from "@/types/services";

import { MiniCalendar } from "./MiniCalendar";
import { ServiceSlideCard } from "./ServicesCard";


// ── helpers ──────────────────────────────────────────────────────────────


function getStatusBadge(service: Service) {
  if (!service.kyc_verified)
    return { label: "KYC Required", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: <ShieldAlert className="w-3 h-3" /> };
  if (service.status === "published")
    return { label: "Active", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> };
  if (service.status === "draft")
    return { label: "Draft", color: "text-muted-foreground", bg: "bg-muted/50 border-border/50", icon: <Shield className="w-3 h-3" /> };
  return { label: "Archived", color: "text-muted-foreground", bg: "bg-muted/50 border-border/50", icon: <Shield className="w-3 h-3" /> };
}



// ── main component ──────────────────────────────────────────────────────

interface Props {
  companyId?: string;
  highlightedDates?: string[];
}

export function DashboardTopStrip({ companyId, highlightedDates = [] }: Props) {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useMyServices(companyId);
  const isEmpty = !isLoading && services.length === 0;

  return (
    <div className=" rounded-lg border border-border/40 flex flex-col md:flex-row gap-4 md:gap-0 overflow-hidden min-h-[260px]">

      {/* ── TOP/LEFT: Calendar ─────────────────────────────────────── */}
      <MiniCalendar
        className="w-full md:w-72 md:min-w-72 p-4 shrink-0 md:rounded-r-none"
        highlightedDates={highlightedDates}
      />

      {/* ── BOTTOM/RIGHT: Services area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 md:pr-4 relative bg-background">
                <RoundingLine className="absolute z-0 -top-3 left-0 text-primary-50 dark:text-primary-900 z-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0 z-1 relative">
          <h3 className="text-xl md:text-2xl font-millik font-bold text-primary-600 whitespace-nowrap truncate mr-3">
            {isEmpty ? "Get started with Nnarks" : "My Services"}
          </h3>
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/organization" as never })}
            className="shrink-0"
          >
            {isEmpty ? "Create Service" : "Manage Services"}
          </Button>
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 px-4 pb-4 flex items-stretch overflow-x-auto scrollbar-hide">
            {isEmpty ? (
              <ServiceSlideCard
                title="No services yet"
                description="List your services so clients can find and hire you. Each service can be individually verified via KYC."
                positionText="!"
                isLast={true}
                onClick={() => navigate({ to: "/organization" as never })}
                actionContent={
                  <button type="button" className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline transition-colors">
                    Create your first service
                  </button>
                }
              />
            ) : (
              services.map((service, idx) => (
                <ServiceSlideCard
                  key={service.id}
                  title={service.title}
                  description={service.description || service.category || "No description"}
                  category={service.category}
                  status={getStatusBadge(service)}
                  positionText={idx + 1}
                  isLast={idx === services.length - 1}
                  onClick={() => navigate({ to: "/organization" as never })}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

