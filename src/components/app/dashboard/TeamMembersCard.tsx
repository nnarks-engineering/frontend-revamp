import { Link } from "@tanstack/react-router";
import {
  ChevronRight,

  UserPlus,
  Users,
} from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { AnimatedTooltip } from "@/components/common/animated-tooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCompanyMembers } from "@/shared/hooks/use-company-members";
import { cn } from "@/shared/lib/utils";
import type { CompanyMemberStatus } from "@/types/enums";






function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-3">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
        <UserPlus className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">No team members</p>
        <p className="text-xs text-muted-foreground mt-0.5 max-w-[220px]">
          Invite people to your organization to start collaborating.
        </p>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────

interface TeamMembersCardProps {
  companyId?: string;
  className?: string;
}

export function TeamMembersCard({ companyId, className }: TeamMembersCardProps) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);

  const activeMembers = members.filter((m) => m.status === CompanyMemberStatus.active);
  const pendingCount = members.filter((m) => m.status === "pending").length;

  return (
    <Card className={cn("bg-white rounded-2xl p- overflow-visible shadow-xs border border-border/40 h-fit flex flex-col", className)}>
      {/* Header */}
      <CardHeader decoration={RoundingLine} decorationClassName="absolute -top-3 left-0 text-primary/10" className="relative flex items-center justify-between mb-4 overflow-clip">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-[15px] font-bold text-foreground">Team Members</h3>
          {members.length > 0 && (
            <span className="text-[11px] text-muted-foreground font-medium ml-1">
              {activeMembers.length} active{pendingCount > 0 ? ` · ${pendingCount} pending` : ""}
            </span>
          )}
        </div>

      </CardHeader>



      {/* Body */}
      <CardContent className="flex-1 flex flex-col px-6 pb-6">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-0.5 flex-1 overflow-visible scrollbar-hide relative">
              <AnimatedTooltip
                items={activeMembers.slice(0, 5).map((member) => ({
                  id: member.id,
                  name: member.email,
                  designation: member.email || "Me",
                  image: `https://dekhbwnxmhgsvndwpiox.supabase.co/storage/v1/object/public/events/27c527de-8757-4a85-a6a5-1e5698b5360e/nominations/1778082356002.webp`,
                }))}
              />
            </div>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={"/organization/team" as any}
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Manage
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
