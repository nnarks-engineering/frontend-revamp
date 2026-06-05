import {
  CREATE_PROJECT_ROUTE,
  PROJECTS_PAGE_SIZE,
  ProjectsStatusTabs,
  ProjectsTable,
  useProjectTabCounts,
  useProjectTabFilter,
} from "@/components/app/page/projects/shared";
import { PageHeader } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/shared/hooks/use-projects";
import type { ProjectListTab } from "@/types/project-list";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

type ProjectsSearch = {
  tab: ProjectListTab;
};

const VALID_TABS: readonly ProjectListTab[] = ["active", "pending", "completed"] as const;

export const Route = createFileRoute("/_app/projects/")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
    tab: VALID_TABS.includes(search.tab as ProjectListTab)
      ? (search.tab as ProjectListTab)
      : "active",
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate({ from: "/_app/projects/" });
  const { data, isLoading } = useProjects({ page: 1, size: PROJECTS_PAGE_SIZE });

  const items = data?.items ?? [];
  const counts = useProjectTabCounts(items);
  const filteredProjects = useProjectTabFilter(items, tab);

  const setTab = (nextTab: ProjectListTab) => {
    navigate({ to: ".", search: { tab: nextTab } }).catch(() => {});
  };

  const goToCreate = () => {
    navigate({ to: CREATE_PROJECT_ROUTE }).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <PageHeader
        title="Projects"
        subtitle="Manage your escrow projects and milestones"
      >
        <Button variant="default" onClick={goToCreate}>+ Create Project</Button>
      </PageHeader>

      <ProjectsStatusTabs value={tab} onChange={setTab} counts={counts} />

      <ProjectsTable projects={filteredProjects} isLoading={isLoading} />
    </div>
  );
}
