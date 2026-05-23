import { DashboardRightPanel, DashboardTopStrip, DashboardVideo, InfoCard, ProjectsCard, TeamMembersCard, WelcomeBanner } from "@/components/app/dashboard";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_app/org")({
  component: DashboardPage,
});

// Upcoming schedule dates (would come from schedules API later)
const UPCOMING_DATES = [
  new Date(new Date().getFullYear(), new Date().getMonth(), 26).toISOString(),
  new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
];

function DashboardPage() {
  useRightPanel(<DashboardRightPanel />, { openOnMount: true });

  const { data: companies = [] } = useMyCompanies();
  const [activeCompanyId] = useState<string | null>(() =>
    localStorage.getItem("nnarks_active_company_id") ?? null
  );
  const activeCompany = useMemo(
    () => companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null,
    [companies, activeCompanyId]
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-12 space-y-5">

      {/* ── Top Strip: Calendar + Services (single horizontal row) ── */}
      <DashboardTopStrip
        companyId={activeCompany?.id}
        highlightedDates={UPCOMING_DATES}
      />

      {/* ── Main Content Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">
         
      <div className="@container">
          <WelcomeBanner />
      </div>
         <InfoCard
            title="Tip for the Week"
            titleColor="text-amber-500"
            description="even your procrastination has potential—just nudge it a little and call it progress!"
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

        {/* Right Column */}
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
