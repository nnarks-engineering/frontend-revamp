import { Building2, ShieldCheck } from "lucide-react";
import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/image/Image";
import { StatusBadge } from "@/components/ui/status-badge";
import type { MemberResponse } from "@/types/projects";

import { InviteSection } from "./InviteSection";

// ── Partner Company Card ──────────────────────────────────────────────────────

interface PartnerCompanyCardProps {
  readonly member: MemberResponse | undefined;
  readonly projectId: string;
}

export function PartnerCompanyCard({ member, projectId }: PartnerCompanyCardProps) {
  if (!member) {
    return (
      <Card className="w-full overflow-hidden flex h-full flex-col p-0! border-border/40">
        <div className="h-24 bg-emerald-500 relative overflow-hidden shrink-0">
          <RoundingLine className="absolute z-0 -top-6 left-0 text-emerald-300 opacity-50 scale-x-[-1]" />
        </div>
        <div className="px-5 pb-6 relative flex flex-col flex-1">
          <div className="relative -mt-10 mb-3 self-start">
            <div className="p-1 rounded-full size-22 border border-dashed border-emerald-500/40 bg-background flex items-center justify-center">
              <Building2 className="w-8 h-8 text-emerald-500/40" />
            </div>
          </div>
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-millik font-bold text-foreground">
                Partner Company
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">Not assigned yet</p>
          </div>
          <InviteSection projectId={projectId} compact />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden flex h-full flex-col p-0! border-border/40">
      <div className="h-24 bg-emerald-500 relative overflow-hidden shrink-0">
        <RoundingLine className="absolute z-0 -top-6 left-0 text-emerald-300 opacity-50 scale-x-[-1]" />
        <div className="absolute top-3 right-3">
          <StatusBadge variant={member.status} size="sm" />
        </div>
      </div>
      <div className="px-5 pb-6 relative flex flex-col flex-1">
        <div className="relative -mt-10 mb-3 self-start">
          <div className="p-1 rounded-full size-22 border border-dashed border-muted-foreground/40 bg-background">
            <Image
              alt={member.email}
              fullName={member.email}
              className="h-20 w-20 rounded-full border-4 border-background shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-millik font-bold text-foreground">
              Partner Company
            </h2>
          </div>
          <p className="text-sm text-foreground">{member.email}</p>
          <p className="text-sm text-muted-foreground mt-1 capitalize">
            {member.role}
          </p>
        </div>
      </div>
    </Card>
  );
}

// ── Supervisor Card ─────────────────────────────────────────────────────────

interface SupervisorCardProps {
  readonly member: MemberResponse | undefined;
  readonly projectId: string;
  readonly supervisionLevel: string;
}

export function SupervisorCard({
  member,
  projectId,
  supervisionLevel,
}: SupervisorCardProps) {
  if (!member) {
    return (
      <Card className="w-full overflow-hidden flex h-full flex-col p-0! border-border/40">
        <div className="h-24 bg-amber-500 relative overflow-hidden shrink-0">
          <RoundingLine className="absolute z-0 -top-6 left-0 text-amber-300 opacity-50 scale-x-[-1]" />
        </div>
        <div className="px-5 pb-6 relative flex flex-col flex-1">
          <div className="relative -mt-10 mb-3 self-start">
            <div className="p-1 rounded-full size-22 border border-dashed border-amber-500/40 bg-background flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-amber-500/40" />
            </div>
          </div>
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-millik font-bold text-foreground">
                Supervisor
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">Not assigned yet</p>
            <p className="text-xs text-muted-foreground/70">
              Supervision level:{" "}
              <span className="capitalize font-medium">
                {supervisionLevel?.replace(/_/g, " ")}
              </span>
            </p>
          </div>
          <InviteSection projectId={projectId} compact />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden flex h-full flex-col p-0! border-border/40">
      <div className="h-24 bg-amber-500 relative overflow-hidden shrink-0">
        <RoundingLine className="absolute z-0 -top-6 left-0 text-amber-300 opacity-50 scale-x-[-1]" />
        <div className="absolute top-3 right-3">
          <StatusBadge variant={member.status} size="sm" />
        </div>
      </div>
      <div className="px-5 pb-6 relative flex flex-col flex-1">
        <div className="relative -mt-10 mb-3 self-start">
          <div className="p-1 rounded-full size-22 border border-dashed border-muted-foreground/40 bg-background">
            <Image
              alt={member.email}
              fullName={member.email}
              className="h-20 w-20 rounded-full border-4 border-background shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-millik font-bold text-foreground">
              Supervisor
            </h2>
          </div>
          <p className="text-sm text-foreground">{member.email}</p>
          <p className="text-sm text-muted-foreground mt-1 capitalize">
            {supervisionLevel?.replace(/_/g, " ")} supervision
          </p>
        </div>
      </div>
    </Card>
  );
}
