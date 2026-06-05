import {
  DashboardRightPanel,
  DashboardTopStrip,
  DashboardVideo,
  InfoCard,
  ProjectsCard,
  TeamMembersCard,
  WelcomeBanner,
} from "@/components/app/dashboard";
import { WeatherWidget } from "@/components/app/shared";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useCurrentProfile } from "@/shared/hooks/use-auth";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { usePermissions } from "@/shared/hooks/use-permissions";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { cn } from "@/shared/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
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
import { useMemo } from "react";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});

function HomePage() {
  const { isClient } = usePermissions();

  if (isClient) {
    return <ClientHomePage />;
  }

  return <VendorHomePage />;
}

function ClientHomePage() {
  const { data: profile } = useCurrentProfile();

  useRightPanel(<DashboardActivityPanel />, { openOnMount: true });

  return (
    <div className="space-y-6 max-w-350 mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-millik md:text-2xl font-bold text-foreground tracking-tight">
            Welcome back, {profile?.first_name ?? "There"} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        <WeatherWidget />
      </div>
    </div>
  );
}

const UPCOMING_DATES = [
  new Date(new Date().getFullYear(), new Date().getMonth(), 26).toISOString(),
  new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
];

function VendorHomePage() {
  useRightPanel(<DashboardRightPanel />, { openOnMount: true });

  const { data: companies = [] } = useMyCompanies();
  const { activeCompanyId } = useActiveCompany();
  const activeCompany = useMemo(
    () => companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null,
    [companies, activeCompanyId],
  );

  return (
    <div className="max-w-350 mx-auto pb-12 space-y-5">
      <DashboardTopStrip
        companyId={activeCompany?.id}
        highlightedDates={UPCOMING_DATES}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">
          <div className="@container">
            <WelcomeBanner />
          </div>

          <InfoCard
            title="Tip for the Week"
            titleColor="text-amber-500"
            description="even your procrastination has potential-just nudge it a little and call it progress!"
            className="bg-oran"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <InfoCard
              title="Escrow Security"
              description="Keep all communications on platform to ensure you are fully protected in case of a dispute."
            />
            <InfoCard
              title="Fast Payouts"
              titleColor="text-emerald-500"
              description="Verify your identity (KYC) to unlock instant withdrawals and higher receiving limits."
            />
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-5">
          <DashboardVideo />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProjectsCard />
            <TeamMembersCard companyId={activeCompany?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ACTIVITY = [
  {
    id: 1,
    icon: Wallet,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Payment received",
    desc: "GHS 12,400 from Project #301",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    title: "KYC verified",
    desc: "Kofi Mensah passed verification",
    time: "18 min ago",
  },
  {
    id: 3,
    icon: FolderOpen,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Project dispute raised",
    desc: "Project #234 - awaiting review",
    time: "1 hr ago",
  },
  {
    id: 4,
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Escrow funds released",
    desc: "GHS 8,000 released to seller",
    time: "3 hr ago",
  },
  {
    id: 5,
    icon: XCircle,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/8",
    title: "Trust circle request rejected",
    desc: "Ama Asante declined invite",
    time: "5 hr ago",
  },
  {
    id: 6,
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/8",
    title: "Monthly report ready",
    desc: "April 2026 summary available",
    time: "Yesterday",
  },
  {
    id: 7,
    icon: Clock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Escrow expiring soon",
    desc: "Project #289 ends in 2 days",
    time: "Yesterday",
  },
];

function DashboardActivityPanel() {
  return (
    <div className="h-full flex flex-col bg-background border-l border-border/40 w-80 shrink-0">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40 shrink-0">
        <div>
          <h3 className="text-[13.5px] font-semibold text-foreground">
            Activity
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Today&apos;s updates
          </p>
        </div>
        <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {ACTIVITY.length} new
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3 space-y-0.5">
        {ACTIVITY.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
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

      <div className="shrink-0 border-t border-border/40 p-3 space-y-2">
        <button type="button" className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary text-white text-[12.5px] font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all">
          <FolderOpen className="w-3.5 h-3.5" />
          New Project
        </button>
        <button type="button" className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border/60 text-muted-foreground text-[12.5px] font-medium hover:bg-muted/40 transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
}
