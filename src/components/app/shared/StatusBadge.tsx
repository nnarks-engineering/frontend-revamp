import { cn } from "@/shared/lib/utils";
import type { TxStatus, ProposalStatus } from "@/types";
import { ProjectStatus, ProjectMilestoneStatus, ProjectMemberRole } from "@/types/projects";

type BadgeStatus = ProjectStatus | ProjectMilestoneStatus | ProjectMemberRole | TxStatus | ProposalStatus | string;

const STATUS_STYLES: Record<string, string> = {
  // Project statuses
  [ProjectStatus.draft]: "bg-muted/60 text-muted-foreground",
  [ProjectStatus.pre_project]: "bg-secondary/15 text-secondary-700",
  [ProjectStatus.active]: "bg-success/10 text-success",
  [ProjectStatus.paused]: "bg-warning/10 text-warning",
  [ProjectStatus.completed]: "bg-primary/10 text-primary",
  [ProjectStatus.archived]: "bg-muted/60 text-muted-foreground",
  // Milestone statuses
  [ProjectMilestoneStatus.pending]: "bg-muted/60 text-muted-foreground",
  [ProjectMilestoneStatus.in_progress]: "bg-primary/10 text-primary",
  [ProjectMilestoneStatus.under_review]: "bg-warning/10 text-warning",
  [ProjectMilestoneStatus.approved]: "bg-success/10 text-success",
  [ProjectMilestoneStatus.failed]: "bg-destructive/10 text-destructive",
  [ProjectMilestoneStatus.skipped]: "bg-muted/60 text-muted-foreground",
  // Member roles
  [ProjectMemberRole.owner]: "bg-primary/10 text-primary",
  [ProjectMemberRole.partner]: "bg-secondary/15 text-secondary-700",
  [ProjectMemberRole.supervisor]: "bg-warning/10 text-warning",
  // Proposal statuses
  ACCEPTED: "bg-success/10 text-success",
  REJECTED: "bg-destructive/10 text-destructive",
  EXPIRED: "bg-muted/60 text-muted-foreground",
};

/** Human-readable labels for enum values */
const STATUS_LABELS: Record<string, string> = {
  PRE_PROJECT: "Pre-project",
  IN_PROGRESS: "In progress",
  UNDER_REVIEW: "Under review",
  [ProjectStatus.pre_project]: "Pre-project",
  [ProjectMilestoneStatus.in_progress]: "In progress",
  [ProjectMilestoneStatus.under_review]: "Under review",
};

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

/**
 * Renders a colored pill badge for any backend enum status.
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-muted/60 text-muted-foreground";
  const label = STATUS_LABELS[status] ?? status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold leading-none whitespace-nowrap",
        style,
        className,
      )}
    >
      {label}
    </span>
  );
}
