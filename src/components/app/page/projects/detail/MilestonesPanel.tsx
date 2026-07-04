import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { MilestoneResponse } from "@/types/projects";
import { ProjectMilestoneStatus } from "@/types/projects";
import NoMileStoneSvg from "@/assets/svg/no-milestone.svg?react";

import { formatCurrency, getStatusColor } from "./helpers";

// ── Single Milestone Card ───────────────────────────────────────────────────

function MilestoneCard({
  milestone,
  index,
  currency,
  onClick,
}: {
  readonly milestone: MilestoneResponse;
  readonly index: number;
  readonly currency: string;
  readonly onClick: () => void;
}) {
  const isActive =
    milestone.status === ProjectMilestoneStatus.in_progress ||
    milestone.status === ProjectMilestoneStatus.under_review;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left rounded-xl border transition-all duration-200 ${
        isActive
          ? "border-primary/30 bg-primary/[0.02] shadow-sm hover:border-primary/50"
          : "border-border/60 bg-background hover:border-border"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isActive
              ? "bg-primary text-primary-foreground"
              : milestone.status === ProjectMilestoneStatus.approved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {index + 1}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {milestone.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatCurrency(milestone.budget_amount, currency)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge variant={milestone.status} size="sm" />
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  );
}

// ── Progress Bar ────────────────────────────────────────────────────────────

function MilestoneProgressBar({
  milestones,
  progressPercent,
}: {
  readonly milestones: readonly MilestoneResponse[];
  readonly progressPercent: number;
}) {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Overall progress</span>
        <span className="font-medium">{progressPercent}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex gap-1.5">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={`h-1.5 flex-1 rounded-full ${getStatusColor(m.status)}`}
            title={`${m.title} — ${m.status}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Milestones Panel ────────────────────────────────────────────────────────

import { Card } from "@/components/ui/card";
import { AddMilestoneDrawer } from "./AddMilestoneDrawer";
import { MilestoneReviewDrawer } from "./MilestoneReviewDrawer";

interface MilestonesPanelProps {
  readonly milestones: readonly MilestoneResponse[];
  readonly currency: string;
  readonly progressPercent: number;
  readonly dealId: string;
  readonly ownerCompanyId: string;
  readonly reviewerCompanyId: string;
  readonly reviewerRole: string;
}

export function MilestonesPanel({
  milestones,
  currency,
  progressPercent,
  dealId,
  ownerCompanyId,
  reviewerCompanyId,
  reviewerRole,
}: MilestonesPanelProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneResponse | null>(null);

  return (
    <>
      <Card className="p-5 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold font-millik text-foreground">
              Milestones
            </h2>
            <p className="text-sm text-muted-foreground">
              Track each phase of your project
            </p>
          </div>
          <Button
            variant="tertiary"
            size="sm"
            className="gap-2"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </Button>
        </div>

        {milestones.length > 0 && (
          <MilestoneProgressBar
            milestones={milestones}
            progressPercent={progressPercent}
          />
        )}

        {milestones.length === 0 ? (
          <div className="border rounded-xl border-dashed flex items-center justify-center py-16 mt-4">
            <EmptyState
              title="No milestones yet"
              description="Add milestones to break your project into phases."
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.id}
                milestone={m}
                index={i}
                currency={currency}
                onClick={() => setSelectedMilestone(m)}
              />
            ))}
          </div>
        )}
      </Card>

      <AddMilestoneDrawer
        projectId={dealId}
        nextPosition={milestones.length + 1}
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        fallbackCompanyId={ownerCompanyId}
      />

      <MilestoneReviewDrawer
        projectId={dealId}
        milestone={selectedMilestone}
        currency={currency}
        open={selectedMilestone !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMilestone(null);
        }}
        reviewerCompanyId={reviewerCompanyId}
        reviewerRole={reviewerRole}
      />
    </>
  );
}
