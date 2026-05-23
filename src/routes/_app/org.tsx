import { DashboardRightPanel, DashboardTopStrip, DashboardVideo, EntityListCard, InfoCard, WelcomeBanner } from "@/components/app/dashboard";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_app/org")({
  component: DashboardPage,
});

// Mock data for EntityListCard
const ACTIVE_PROJECTS = [
  {
    label: "Requires Action",
    items: [
      { id: "1", name: "Kofi Mensah", avatarUrl: "https://i.pravatar.cc/150?u=1" },
      { id: "2", name: "Ama Asante", avatarUrl: "https://i.pravatar.cc/150?u=2" },
      { id: "3", name: "Yaw Osei", avatarUrl: "https://i.pravatar.cc/150?u=3" },
    ],
  },
  {
    label: "On Track",
    items: [
      { id: "4", name: "Abena Serwaa", avatarUrl: "https://i.pravatar.cc/150?u=4" },
      { id: "5", name: "Kwasi Appiah", avatarUrl: "https://i.pravatar.cc/150?u=5" },
      { id: "6", name: "Esi Amponsah", avatarUrl: "https://i.pravatar.cc/150?u=6" },
      { id: "7", name: "Kwame Nkrumah", avatarUrl: "https://i.pravatar.cc/150?u=7" },
      { id: "8", name: "Yaa Asantewaa", avatarUrl: "https://i.pravatar.cc/150?u=8" },
    ],
  },
];

const PENDING_PROPOSALS = [
  {
    label: "Awaiting Review",
    items: [
      { id: "10", name: "Tech Solutions Ltd", initials: "TS" },
      { id: "11", name: "Creative Agency", initials: "CA" },
      { id: "12", name: "Global Logistics", initials: "GL" },
    ],
  },
  {
    label: "Awaiting Signature",
    items: [
      { id: "13", name: "Acme Corp", initials: "AC" },
      { id: "14", name: "StartUp Inc", initials: "SI" },
    ],
  },
];

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EntityListCard
              title="Active Projects"
              viewAllLink="/projects"
              groups={ACTIVE_PROJECTS}
            />
            <EntityListCard
              title="Pending Proposals"
              viewAllLink="/projects"
              groups={PENDING_PROPOSALS}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
