import { ProjectsCardModule, ProjectsModule } from "@/components/app/page/projects/shared";
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
    <div className="mx-auto pb-12 px-6 pt-8 w-full max-w-6xl animate-in fade-in duration-500 @container space-y-12">
      <div>
        <ProjectsCardModule />
      </div>
      <div>
        <ProjectsModule />
      </div>
    </div>
  );
}
