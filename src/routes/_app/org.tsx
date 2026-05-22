import { DashboardRightPanel, DashboardVideo, EntityListCard, InfoCard, WelcomeBanner } from "@/components/app/dashboard";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { createFileRoute } from "@tanstack/react-router";

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
      { id: "9", name: "Kweku Ananse", avatarUrl: "https://i.pravatar.cc/150?u=9" },
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
    label: "Awaiting Client Signature",
    items: [
      { id: "13", name: "Acme Corp", initials: "AC" },
      { id: "14", name: "StartUp Inc", initials: "SI" },
    ],
  },
];

function DashboardPage() {
  useRightPanel(<DashboardRightPanel />, { openOnMount: true });

  return (
    <div className="max-w-[1400px] mx-auto font-outfit pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Spans 4 columns on large screens) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <WelcomeBanner />
          
          <InfoCard
            title="Tip for the Week"
            titleColor="text-amber-500"
            description="even your procrastination has potential—just nudge it a little and call it progress!"
            className="bg-orange-50/30"
          />

          {/* Stacking the Info Cards horizontally if there's space, else vertically */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
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

        {/* Right Column (Spans 7/8 columns on large screens) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          
          {/* Large Video Hero */}
          <DashboardVideo />

          {/* Entity Lists (e.g. Active Projects / Proposals) */}
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
