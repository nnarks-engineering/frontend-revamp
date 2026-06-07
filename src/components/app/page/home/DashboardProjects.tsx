import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/shared/hooks/use-projects";
import { ProjectCard } from "@/components/app/page/projects/shared/ProjectCard";
import { EmptyState } from "@/components/app/shared";
import { CREATE_PROJECT_ROUTE } from "@/components/app/page/projects/shared/constants";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
} from "@/components/ui/module-layout";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import type { Project } from "@/types/projects";

function getPriority(project: Project) {
  switch (project.status?.toUpperCase()) {
    case "ACTIVE":
      return 1;
    case "PRE_PROJECT":
    case "DRAFT":
      return 2;
    case "COMPLETED":
      return 3;
    default:
      return 4;
  }
}

export function DashboardProjects() {
  const navigate = useNavigate();
  const { data, isLoading } = useProjects({ page: 1, size: 50 });
  const allProjects = data?.items ?? [];

  const topProjects = [...allProjects]
    .sort((a, b) => getPriority(a) - getPriority(b))
    .slice(0, 2);

  const goToCreate = () => {
    navigate({ to: CREATE_PROJECT_ROUTE }).catch(() => { });
  };

  return (
    <ModuleLayout className="w-full">
      <ModuleLayoutHeader variant="primary">
        <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none" aria-hidden />
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

        <ModuleLayoutHeaderContent>
          <ModuleLayoutTitle>Projects</ModuleLayoutTitle>
          <ModuleLayoutDescription>
            Manage your escrow projects and milestones
          </ModuleLayoutDescription>
        </ModuleLayoutHeaderContent>

        <ModuleLayoutHeaderActions>
          <Button variant="default" size="sm" className="gap-2" onClick={goToCreate}>
            <Plus className="w-4 h-4" />
            {data?.items.length ? "Create Project" : "Create your first project"}
          </Button>
        </ModuleLayoutHeaderActions>
      </ModuleLayoutHeader>

      <div className="@sm:p-4 @md:p-6">
        <div className="">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : topProjects.length === 0 ? (
              <EmptyState
                title="No projects found"
                description="You don't have any projects yet."
              />
          ) : (
            <div className="flex flex-col gap-4">
              {topProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Button variant="outline" className="gap-2 w-full sm:w-auto" asChild>
              <Link search={{ tab:"active"}} to="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
