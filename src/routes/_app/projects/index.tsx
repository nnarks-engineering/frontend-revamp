import { ProjectsCardModule } from "@/components/app/page/projects/shared";
import type { ProjectListTab } from "@/types/project-list";
import { createFileRoute } from "@tanstack/react-router";

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
  return (

    <div className="h-full flex flex-col p-4 @md:p-4 w-full animate-in fade-in duration-500 @container">
      <ProjectsCardModule />
    </div>
  );
}
