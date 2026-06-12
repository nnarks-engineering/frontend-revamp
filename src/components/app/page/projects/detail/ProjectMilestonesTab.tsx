import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { StatusBadge } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { ProjectMilestoneStatus, type MilestoneResponse, type ProjectDashboardResponse } from "@/types/projects";

function MilestoneRow({ m, index }: { m: MilestoneResponse; index: number }) {
  const [isExpanded, setIsExpanded] = useState(
    m.status === ProjectMilestoneStatus.under_review || m.status === ProjectMilestoneStatus.in_progress
  );

  return (
    <div className="flex flex-col border-b border-border/60 last:border-0">
      <button
      type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-2 py-4 -mx-2 rounded-md hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-[15px] font-semibold text-foreground">
            Milestone {index + 1} — {m.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {m.status === ProjectMilestoneStatus.under_review && <div className="h-2 w-2 rounded-full bg-warning" />}
          {m.status === ProjectMilestoneStatus.approved && <div className="h-2 w-2 rounded-full bg-success" />}
          {m.status === ProjectMilestoneStatus.in_progress && <div className="h-2 w-2 rounded-full bg-primary" />}
          {m.status === ProjectMilestoneStatus.pending && <div className="h-2 w-2 rounded-full border border-muted-foreground" />}

          <StatusBadge status={m.status} />
        </div>
      </button>

      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-200 pl-7 pr-2 pb-6 pt-2">
          <div className="grid grid-cols-[120px_1fr] gap-y-3 text-[14px]">
            <div className="text-muted-foreground">Amount:</div>
            <div className="font-geist font-medium text-foreground">
              ${Number(m.budget_amount).toLocaleString()} <span className="font-normal text-muted-foreground text-[13px]">{(m.status !== ProjectMilestoneStatus.pending) && '(in escrow)'}</span>
            </div>

            <div className="text-muted-foreground">Submitted:</div>
            <div className="text-foreground">{m.start_date}</div>

            <div className="text-muted-foreground mt-2">Thread:</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground text-[13px]">Created by {m.created_by}</span>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                  Raise dispute
                </Button>
                <Button variant="secondary" size="sm">
                  View thread
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/60">
            {m.status === ProjectMilestoneStatus.under_review && (
              <p className="text-[14px] text-foreground">
                Nnarks is reviewing this milestone.
                <br />
                <span className="text-muted-foreground">Estimated: within 24 hours.</span>
              </p>
            )}
            {m.status === ProjectMilestoneStatus.pending && (
              <Button variant="default" size="sm">
                Fund Milestone
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectMilestonesTab({ project }: { project: ProjectDashboardResponse }) {
  if (!project.milestones || project.milestones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p>No milestones have been created for this project yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 max-w-4xl w-full">
      {project.milestones.map((m, i) => (
        <MilestoneRow key={m.id} m={m} index={i} />
      ))}
    </div>
  );
}
