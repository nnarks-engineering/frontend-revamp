
import { useMemo } from "react";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { Card } from "@/components/ui/card";
import { MinimalStatCard } from "@/components/ui/minimal-stat-card";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderActions,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
} from "@/components/ui/module-layout";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ProjectDashboardResponse } from "@/types/projects";
import { ProjectMemberRole, ProjectMilestoneStatus } from "@/types/projects";
import { useCurrentUser } from "@/shared/hooks/auth/use-auth";

import { formatCurrency } from "./helpers";
import { MilestonesPanel } from "./MilestonesPanel";
import { PartnerCompanyCard, SupervisorCard } from "./PartyCards";
import { ProjectDetailsCard } from "./ProjectDetailsCard";

// ── Main View ───────────────────────────────────────────────────────────────



// ── Main View ───────────────────────────────────────────────────────────────

export function ProjectDetailView({
  project,
}: {
  readonly project: ProjectDashboardResponse;
}) {
  const { data: currentUser } = useCurrentUser();

  const partner = project.members.find(
    (m) => m.role === ProjectMemberRole.partner
  );
  const supervisor = project.members.find(
    (m) => m.role === ProjectMemberRole.supervisor
  );

  const currentUserMember = useMemo(() => {
    return project.members.find((m) => m.email === currentUser?.email);
  }, [project.members, currentUser?.email]);

  const reviewerCompanyId = currentUserMember?.company_id || project.owner_company_id;
  const reviewerRole = currentUserMember?.role || "owner";

  const stats = useMemo(() => {
    const totalBudget = Number(project.total_budget) || 0;
    const locked = Number(project.wallet?.locked_balance) || 0;
    const available = Number(project.wallet?.available_balance) || 0;
    return { totalBudget, locked, available };
  }, [project]);

  const completedMilestones = project.milestones.filter(
    (m) =>
      m.status === ProjectMilestoneStatus.approved ||
      m.status === ProjectMilestoneStatus.skipped
  ).length;

  const progressPercent =
    project.milestones.length > 0
      ? Math.round((completedMilestones / project.milestones.length) * 100)
      : 0;

  return (
    <div className="mx-auto p-4 space-y-6 @container max-w-7xl">
      {/* ── Header ─────────────────────────────────────────────── */}
  <Card className="grid grid-cols-1 @sm:grid-cols-3 gap-5 border-none shadow-none p-0">
            <MinimalStatCard
              label="Total Budget"
              value={formatCurrency(stats.totalBudget, project.currency)}
            />
            <MinimalStatCard
              label="In Escrow"
              value={formatCurrency(stats.locked, project.currency)}
            />
            <MinimalStatCard
              label="Available"
              value={formatCurrency(stats.available, project.currency)}
            />
          </Card>


      {/* ── Two-column Layout ──────────────────────────────────── */}
      <div className="flex flex-col @4xl:flex-row items-start gap-6">
        {/* ── Left Column ──────────────────────────────────────── */}
        <div className="w-full flex-1 min-w-0 flex flex-col gap-6">
          {/* <ProjectDetailsCard project={project} /> */}
          <ModuleLayout className="w-full">
        <ModuleLayoutHeader variant="tertiary">
          <RoundingLine
            className="absolute -top-3 right-0 scale-x-[-1] text-tertiary-bg-hover pointer-events-none"
            aria-hidden
          />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-orange-10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <ModuleLayoutHeaderContent>
            <ModuleLayoutTitle>{project.title}</ModuleLayoutTitle>
          </ModuleLayoutHeaderContent>
          <ModuleLayoutHeaderActions>
            <StatusBadge variant={project.status} />
          </ModuleLayoutHeaderActions>
        </ModuleLayoutHeader>

      </ModuleLayout>


          <MilestonesPanel
            milestones={project.milestones}
            currency={project.currency}
            progressPercent={progressPercent}
            dealId={project.id}
            ownerCompanyId={project.owner_company_id}
            reviewerCompanyId={reviewerCompanyId}
            reviewerRole={reviewerRole}
          />
        </div>

        {/* ── Right Column ─────────────────────────────────────── */}
        <aside className="w-full @4xl:w-80 shrink-0 flex flex-col gap-4 @4xl:sticky @4xl:top-4 self-start">
          <PartnerCompanyCard
            member={partner}
            projectId={project.id}
          />
          <SupervisorCard
            member={supervisor}
            projectId={project.id}
            supervisionLevel={project.supervision_level}
          />
        </aside>
      </div>
    </div>
  );
}
