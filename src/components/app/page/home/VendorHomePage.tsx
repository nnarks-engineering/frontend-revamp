import { useMemo } from "react";

import { Megaphone } from "lucide-react";

import {
  DashboardTopStrip,
  DashboardVideo,
  InfoCard,
  ProjectsCard,
  TeamMembersCard,
  VendorAnnouncementsSliderPanel,
  WelcomeBanner,
} from "@/components/app/dashboard";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { useRightPanel } from "@/shared/hooks/use-right-panel";

import { UPCOMING_DATES } from "./constants";


export function VendorHomePage() {
  useRightPanel(<VendorAnnouncementsSliderPanel />, { openOnMount: true, icon: Megaphone });

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
        highlightedDates={[...UPCOMING_DATES]}
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
