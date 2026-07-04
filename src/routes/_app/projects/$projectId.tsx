import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";

import { ProjectDetailView } from "@/components/app/page/projects/detail/ProjectDetailView";
import { EmptyState } from "@/components/app/shared";
import { useProject } from "@/shared/hooks/project/use-projects";

export const Route = createFileRoute("/_app/projects/$projectId")({
  validateSearch: z.object({
    tab: z
      .enum(["overview", "milestones"])
      .optional()
      .default("overview"),
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { data: project, isLoading } = useProject(projectId);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptyState
          icon={AlertCircle}
          title="Project not found"
          description="The project you are looking for does not exist or you don't have access to it."
        />
      </div>
    );
  }

  return <ProjectDetailView project={project} />;
}
