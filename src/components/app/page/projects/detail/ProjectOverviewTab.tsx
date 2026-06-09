import { StatusBadge } from "@/components/app/shared";
import type { ProjectDashboard } from "@/types/projects";

export function ProjectOverviewTab({ project }: { project: ProjectDashboard }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl p-6">
      <div className="flex flex-col gap-3 text-[14px]">
        <div className="flex justify-between border-b border-border/60 pb-2">
          <span className="text-muted-foreground">Total budget</span>
          <span className="font-geist font-medium text-foreground">
            {project.currency} {Number(project.total_budget).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
          <span className="text-muted-foreground">In escrow</span>
          <span className="font-geist font-medium text-primary">
            {project.currency} {(project.wallet?.locked_balance || 0).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
          <span className="text-muted-foreground">Start date</span>
          <span className="text-foreground">{new Date(project.start_date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
          <span className="text-muted-foreground">End date</span>
          <span className="text-foreground">{new Date(project.end_date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
          <span className="text-muted-foreground">Status</span>
          <StatusBadge status={project.status} />
        </div>
      </div>
    </div>
  );
}
