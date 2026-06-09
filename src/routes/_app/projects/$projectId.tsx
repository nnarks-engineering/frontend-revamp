import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { EmptyState } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { useProject } from "@/shared/hooks/use-projects";
import { AlertCircle, Plus } from "lucide-react";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
  ModuleLayoutToolbar,
} from "@/components/ui/module-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { ProjectOverviewTab } from "@/components/app/page/projects/detail/ProjectOverviewTab";
import { ProjectMilestonesTab } from "@/components/app/page/projects/detail/ProjectMilestonesTab";
import { ProjectMembersTab } from "@/components/app/page/projects/detail/ProjectMembersTab";

export const Route = createFileRoute("/_app/projects/$projectId")({
  validateSearch: z.object({
    tab: z.enum(["overview", "milestones", "members"]).optional().default("overview"),
  }),
  component: ProjectDetailPage,
});

type TabKey = "overview" | "milestones" | "members";

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { tab } = Route.useSearch();
  const navigate = useNavigate();

  const setTab = (value: TabKey) => {
    navigate({ to: ".", search: { tab: value } }).catch(() => {});
  };

  const { data: project, isLoading, error } = useProject(projectId);

  console.log("PROJECT DETAIL DEBUG:", { projectId, project, isLoading, error });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptyState icon={AlertCircle} title="Project not found" description="The project you are looking for does not exist or you don't have access to it." />
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 @container h-full w-full max-w-6xl">
      <ModuleLayout className="w-full flex-1 min-w-0 h-full">
        <ModuleLayoutHeader variant="tertiary">
          <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-tertiary-bg-hover pointer-events-none" aria-hidden />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-orange-10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <ModuleLayoutHeaderContent>
            <ModuleLayoutTitle>{project.title}</ModuleLayoutTitle>
            <ModuleLayoutDescription>
              {project.description}
            </ModuleLayoutDescription>
          </ModuleLayoutHeaderContent>
          <ModuleLayoutHeaderActions>
            <Button variant="tertiary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Milestone
            </Button>
          </ModuleLayoutHeaderActions>
        </ModuleLayoutHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="px-6 pb-6">
          <div className="border rounded-md">
            <ModuleLayoutToolbar className="flex-wrap gap-2">
              <TabsList variant="tertiary">
                <TabsTrigger value="overview" className="gap-1.5 font-poppins">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="milestones" className="gap-1.5 font-poppins">
                  Milestones
                </TabsTrigger>
                <TabsTrigger value="members" className="gap-1.5 font-poppins">
                  Members
                </TabsTrigger>
              </TabsList>
            </ModuleLayoutToolbar>

            <TabsContent value="overview" className="m-0 border-t border-border/60">
              <ProjectOverviewTab project={project} />
            </TabsContent>
            
            <TabsContent value="milestones" className="m-0 border-t border-border/60">
              <ProjectMilestonesTab project={project} />
            </TabsContent>

            <TabsContent value="members" className="m-0 border-t border-border/60">
              <ProjectMembersTab project={project} />
            </TabsContent>
          </div>
        </Tabs>
      </ModuleLayout>
    </div>
  );
}
