import { createFileRoute } from "@tanstack/react-router";

import { TeamPageClient } from "@/components/app/organization/TeamPageClient";
import { useCurrentCompany } from "@/shared/hooks/company/use-current-company";

type TeamSearch = {
  tab: "members" | "roles" | "invitations";
  q: string;
  page: number;
};

const VALID_TABS = ["members", "roles", "invitations"] as const;

export const Route = createFileRoute("/_app/organization/team")({
  validateSearch: (search: Record<string, unknown>): TeamSearch => ({
    tab: VALID_TABS.includes(search.tab as TeamSearch["tab"])
      ? (search.tab as TeamSearch["tab"])
      : "members",
    q: typeof search.q === "string" ? search.q : "",
    page: Math.max(1, Number(search.page) || 1),
  }),
  component: OrganizationTeamPage,
});

function OrganizationTeamPage() {
  const { activeCompany } = useCurrentCompany();

  if (!activeCompany) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading organization...</p>
      </div>
    );
  }

  return <TeamPageClient company={activeCompany} />;
}
