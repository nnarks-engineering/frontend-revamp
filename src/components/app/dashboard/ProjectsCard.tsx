import { useProjects } from "@/shared/hooks/use-projects";
import { cn } from "@/shared/lib/utils";
import type { Project } from "@/types/projects";
import type { ProjectStatus } from "@/types/enums";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  CircleDot,
  FolderOpen,
  MapPin,
} from "lucide-react";

// ── Status helpers ──────────────────────────────────────────────────────

const STATUS_MAP: Record<ProjectStatus, { label: string; dot: string }> = {
  DRAFT:       { label: "Draft",       dot: "bg-slate-400" },
  PRE_PROJECT: { label: "Pre-project", dot: "bg-amber-400" },
  ACTIVE:      { label: "Active",      dot: "bg-emerald-500" },
  PAUSED:      { label: "Paused",      dot: "bg-amber-500" },
  COMPLETED:   { label: "Completed",   dot: "bg-primary" },
  ARCHIVED:    { label: "Archived",    dot: "bg-muted-foreground" },
};

function statusMeta(status: ProjectStatus) {
  return STATUS_MAP[status] ?? { label: status, dot: "bg-muted-foreground" };
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  } catch {
    return "—";
  }
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

// ── Sub-components ──────────────────────────────────────────────────────

function ProjectRow({ project }: { project: Project }) {
  const { label, dot } = statusMeta(project.status);

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={"/projects" as any}
      className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors group"
    >
      {/* Icon */}
      <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
        <Briefcase className="w-4 h-4 text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-[13px] font-bold text-foreground truncate">{project.title}</h4>
          <span className={cn("shrink-0 w-2 h-2 rounded-full", dot)} title={label} />
        </div>

        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
          {project.description || "No description"}
        </p>

        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
          {project.location_address && (
            <span className="flex items-center gap-0.5 truncate max-w-[120px]">
              <MapPin className="w-3 h-3 shrink-0" />
              {project.location_address}
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <Calendar className="w-3 h-3 shrink-0" />
            {formatDate(project.start_date)}
          </span>
          <span className="font-semibold text-foreground/70">
            {formatCurrency(project.total_budget, project.currency)}
          </span>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-3">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <FolderOpen className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">No projects yet</p>
        <p className="text-xs text-muted-foreground mt-0.5 max-w-[220px]">
          Create your first project to start collaborating with your team.
        </p>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────

interface ProjectsCardProps {
  className?: string;
}

export function ProjectsCard({ className }: ProjectsCardProps) {
  const { data, isLoading } = useProjects({ size: 6 });
  const projects = data?.items ?? [];

  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-xs border border-border/40 h-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CircleDot className="w-4 h-4 text-primary" />
          <h3 className="text-[15px] font-bold text-foreground">Active Projects</h3>
        </div>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={"/projects" as any}
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
