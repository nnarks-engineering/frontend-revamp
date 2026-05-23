import { useCompanyMembers } from "@/shared/hooks/use-company-members";
import { cn } from "@/shared/lib/utils";
import type { CompanyMember } from "@/types/companies";
import type { CompanyMemberStatus, CompanyRole } from "@/types/enums";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Crown,
  Mail,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

// ── Helpers ─────────────────────────────────────────────────────────────

const ROLE_META: Record<CompanyRole, { label: string; icon: React.ReactNode; color: string }> = {
  owner:  { label: "Owner",  icon: <Crown className="w-3 h-3" />,       color: "text-amber-600" },
  admin:  { label: "Admin",  icon: <ShieldCheck className="w-3 h-3" />, color: "text-primary" },
  member: { label: "Member", icon: <Users className="w-3 h-3" />,       color: "text-foreground/60" },
  viewer: { label: "Viewer", icon: <Users className="w-3 h-3" />,       color: "text-muted-foreground" },
  agent:  { label: "Agent",  icon: <ShieldCheck className="w-3 h-3" />, color: "text-violet-600" },
};

const STATUS_DOT: Record<CompanyMemberStatus, string> = {
  active:  "bg-emerald-500",
  pending: "bg-amber-400",
  removed: "bg-red-400",
  left:    "bg-muted-foreground",
};

function getInitials(email: string) {
  const local = email.split("@")[0] ?? "";
  return local.slice(0, 2).toUpperCase();
}

// ── Sub-components ──────────────────────────────────────────────────────

function MemberRow({ member }: { member: CompanyMember }) {
  const role = ROLE_META[member.role] ?? ROLE_META.member;
  const dotColor = STATUS_DOT[member.status] ?? "bg-muted-foreground";

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
          {getInitials(member.email)}
        </div>
        <span
          className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white", dotColor)}
          title={member.status}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-foreground truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={cn("flex items-center gap-0.5 text-[10px] font-semibold", role.color)}>
            {role.icon}
            {role.label}
          </span>
          {member.status === "pending" && (
            <span className="text-[10px] text-amber-600 font-medium ml-1">• Pending</span>
          )}
        </div>
      </div>

      {/* Joined date */}
      <span className="text-[10px] text-muted-foreground shrink-0">
        {member.joined_at
          ? new Date(member.joined_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
          : "Invited"}
      </span>
    </div>
  );
}

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

  const activeCount = members.filter((m) => m.status === "active").length;
  const pendingCount = members.filter((m) => m.status === "pending").length;

  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-xs border border-border/40 h-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-[15px] font-bold text-foreground">Team Members</h3>
          {members.length > 0 && (
            <span className="text-[11px] text-muted-foreground font-medium ml-1">
              {activeCount} active{pendingCount > 0 ? ` · ${pendingCount} pending` : ""}
            </span>
          )}
        </div>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={"/organization" as any}
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Manage
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Invite banner */}
      {members.length > 0 && (
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={"/organization" as any}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 mb-3 hover:bg-primary/10 transition-colors"
        >
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary">Invite a team member</span>
        </Link>
      )}

      {/* Body */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-0.5 flex-1 overflow-y-auto scrollbar-hide">
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
