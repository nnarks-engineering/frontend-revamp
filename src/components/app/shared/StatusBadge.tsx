import { cn } from "@/shared/lib/utils";
import type { ProjectStatus, MilestoneStatus, MemberRole, TxStatus, ProposalStatus } from "@/types/enums";

type BadgeStatus = ProjectStatus | MilestoneStatus | MemberRole | TxStatus | ProposalStatus | string;

const STATUS_STYLES: Record<string, string> = {
  // Project statuses
  DRAFT: "bg-muted/60 text-muted-foreground",
  PRE_PROJECT: "bg-secondary/15 text-secondary-700",
  ACTIVE: "bg-success/10 text-success",
  PAUSED: "bg-warning/10 text-warning",
  COMPLETED: "bg-primary/10 text-primary",
  ARCHIVED: "bg-muted/60 text-muted-foreground",
  // Milestone statuses
  PENDING: "bg-muted/60 text-muted-foreground",
  IN_PROGRESS: "bg-primary/10 text-primary",
  UNDER_REVIEW: "bg-warning/10 text-warning",
  APPROVED: "bg-success/10 text-success",
  FAILED: "bg-destructive/10 text-destructive",
  SKIPPED: "bg-muted/60 text-muted-foreground",
  // Member roles
  OWNER: "bg-primary/10 text-primary",
  PARTNER: "bg-secondary/15 text-secondary-700",
  SUPERVISOR: "bg-warning/10 text-warning",
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
