import { StatusBadge } from "@/components/app/shared";
import type { ProjectDashboard } from "@/types/projects";

export function ProjectMembersTab({ project }: { project: ProjectDashboard }) {
  if (!project.members || project.members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p>No members have been assigned to this project yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-6 max-w-4xl w-full">
      {project.members.map((m) => (
        <div key={m.id} className="flex items-center gap-3 font-medium text-foreground text-[14px] p-3 border border-border/60 rounded-lg hover:bg-muted/40 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-[13px]">
            {m.email.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-foreground">{m.email}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="uppercase tracking-wider font-semibold text-[10px]">{m.status}</span>
            </div>
          </div>
          <StatusBadge status={m.role} className="ml-auto" />
        </div>
      ))}
    </div>
  );
}
