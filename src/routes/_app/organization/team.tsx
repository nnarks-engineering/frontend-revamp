import { TeamPageClient } from "@/components/app/organization/TeamPageClient";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_app/organization/team")({
  component: OrganizationTeamPage,
});

function OrganizationTeamPage() {
  const { data: companies = [] } = useMyCompanies();
  const [activeCompanyId] = useState<string | null>(() =>
    localStorage.getItem("nnarks_active_company_id") ?? null
  );
  
  const activeCompany = useMemo(
    () => companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null,
    [companies, activeCompanyId]
  );

  if (!activeCompany) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading organization...</p>
      </div>
    );
  }

  return <TeamPageClient company={activeCompany} />;
}
