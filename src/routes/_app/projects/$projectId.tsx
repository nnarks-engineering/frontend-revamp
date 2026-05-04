import { createFileRoute } from "@tanstack/react-router";
import { StatusBadge, EmptyState } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS } from "@/data/mock/projects";
import { ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { Milestone } from "@/types/projects";

export const Route = createFileRoute("/_app/projects/$projectId")({
  component: ProjectDetailPage,
});

function MilestoneRow({ m, index }: { m: Milestone; index: number }) {
  const [isExpanded, setIsExpanded] = useState(
    m.status === "UNDER_REVIEW" || m.status === "IN_PROGRESS"
  );

  return (
    <div className="flex flex-col border-b border-border/60 last:border-0">
      <button
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
          {m.status === "UNDER_REVIEW" && <div className="h-2 w-2 rounded-full bg-warning" />}
          {m.status === "APPROVED" && <div className="h-2 w-2 rounded-full bg-success" />}
          {m.status === "IN_PROGRESS" && <div className="h-2 w-2 rounded-full bg-primary" />}
          {m.status === "PENDING" && <div className="h-2 w-2 rounded-full border border-muted-foreground" />}
          
          <StatusBadge status={m.status} />
        </div>
      </button>

      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-200 pl-7 pr-2 pb-6 pt-2">
          <div className="grid grid-cols-[120px_1fr] gap-y-3 text-[14px]">
            <div className="text-muted-foreground">Amount:</div>
            <div className="font-geist font-medium text-foreground">
              ${m.budget_amount.toLocaleString()} <span className="font-normal text-muted-foreground text-[13px]">{(m.status !== "PENDING") && '(in escrow)'}</span>
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
            {m.status === "UNDER_REVIEW" && (
              <p className="text-[14px] text-foreground">
                Nnarks is reviewing this milestone.
                <br />
                <span className="text-muted-foreground">Estimated: within 24 hours.</span>
              </p>
            )}
            {m.status === "PENDING" && (
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

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = MOCK_PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <EmptyState icon={AlertCircle} title="Project not found" description="The project you are looking for does not exist or you don't have access to it." />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl mx-auto px-6 py-8 pb-20 h-full animate-in fade-in duration-500">
      {/* LEFT: 30% Summary */}
      <div className="flex flex-col gap-6 w-full md:w-[30%] shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground mb-1">{project.title}</h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-[14px]">
          <div className="flex justify-between border-b border-border/60 pb-2">
            <span className="text-muted-foreground">Total budget</span>
            <span className="font-geist font-medium text-foreground">${project.total_budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
            <span className="text-muted-foreground">In escrow</span>
            <span className="font-geist font-medium text-primary">${(project.wallet?.locked_balance || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
            <span className="text-muted-foreground">Created</span>
            <span className="text-foreground">{new Date(project.start_date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-2 mt-1">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge status={project.status} />
          </div>

          <div className="mt-4">
            <span className="block mb-3 text-[12px] font-semibold tracking-wider uppercase text-muted-foreground">Participants</span>
            <div className="flex flex-col gap-2">
              {project.members.map((m) => (
                <div key={m.id} className="flex items-center gap-3 font-medium text-foreground text-[14px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px]">
                    {m.email.substring(0, 2).toUpperCase()}
                  </div>
                  {m.email}
                  <StatusBadge status={m.role} className="ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: 70% Milestones */}
      <div className="flex flex-col w-full md:w-[70%] pr-4">
        <h2 className="text-[13px] font-semibold tracking-wider uppercase text-muted-foreground mb-4">
          Milestones
        </h2>
        <div className="flex flex-col">
          {project.milestones.map((m, i) => (
            <MilestoneRow key={m.id} m={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
