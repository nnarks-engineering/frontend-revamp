import { WeatherWidget } from "@/components/app/shared";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { cn } from "@/shared/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useCurrentProfile } from "@/shared/hooks/use-auth";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FolderOpen,
  ShieldCheck,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/_app/org")({
  component: DashboardPage,
});

function DashboardPage() {


    const { data: profile } = useCurrentProfile();

  useRightPanel(<DashboardActivityPanel />, { openOnMount: true });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto font-outfit">
      {/* Welcome Section */}
      <div className="flex  items-start h-fit justify-between flex-wrap gap-4">
        <div className="bg-background flex-1 h-full rounded-lg border border-border/50 p-6">
          <h2 className="text-xl md:text-2xl font-bold font-millik text-foreground tracking-tight">
            Welcome back, {profile?.first_name ?? "There"} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        <WeatherWidget />
      </div>
    </div>
  );
}

// ─── Dashboard right panel ────────────────────────────────────────────────────

const ACTIVITY = [
  {
    id: 1,
    icon: Wallet,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Payment received",
    desc: "GHS 12,400 from Project #301",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    title: "KYC verified",
    desc: "Kofi Mensah passed verification",
    time: "18 min ago",
    status: "success",
  },
  {
    id: 3,
    icon: FolderOpen,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Project dispute raised",
    desc: "Project #234 — awaiting review",
    time: "1 hr ago",
    status: "warning",
  },
  {
    id: 4,
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Escrow funds released",
    desc: "GHS 8,000 released to seller",
    time: "3 hr ago",
    status: "success",
  },
  {
    id: 5,
    icon: XCircle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/8",
    title: "Trust circle request rejected",
    desc: "Ama Asante declined invite",
    time: "5 hr ago",
    status: "error",
  },
  {
    id: 6,
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    title: "Monthly report ready",
    desc: "April 2026 summary available",
    time: "Yesterday",
    status: "info",
  },
  {
    id: 7,
    icon: Clock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Escrow expiring soon",
    desc: "Project #289 ends in 2 days",
    time: "Yesterday",
    status: "warning",
  },
];

function DashboardActivityPanel() {
  return (
    <div className="h-full flex flex-col bg-white border-l border-border/40 font-outfit w-80 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40 shrink-0">
        <div>
          <h3 className="text-[13.5px] font-semibold text-foreground">
            Activity
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Today's updates
          </p>
        </div>
        <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {ACTIVITY.length} new
        </span>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3 space-y-0.5">
        {ACTIVITY.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-muted/40 transition-colors duration-150 text-left group"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  item.iconBg,
                )}
              >
                <Icon className={cn("w-4 h-4", item.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-foreground leading-snug truncate">
                  {item.title}
                </p>
                <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10.5px] text-muted-foreground/70 whitespace-nowrap">
                  {item.time}
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer — quick actions */}
      <div className="shrink-0 border-t border-border/40 p-3 space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary text-white text-[12.5px] font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all">
          <FolderOpen className="w-3.5 h-3.5" />
          New Project
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border/60 text-muted-foreground text-[12.5px] font-medium hover:bg-muted/40 transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
}
