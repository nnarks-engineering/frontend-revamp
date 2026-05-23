import {
  useCompanyMembers,
  useRemoveCompanyMember,
  useUpdateCompanyMember,
} from "@/shared/hooks/use-company-members";
import { Button } from "@/components/ui/button";
import type { CompanyRole } from "@/types/enums";
import { ShieldCheck, UserX, Crown, Users } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useState } from "react";

const ROLE_META: Record<CompanyRole, { label: string; icon: React.ReactNode; color: string }> = {
  owner: { label: "Owner", icon: <Crown className="w-3.5 h-3.5" />, color: "text-amber-600" },
  admin: { label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" />, color: "text-primary" },
  member: { label: "Member", icon: <Users className="w-3.5 h-3.5" />, color: "text-foreground/70" },
  viewer: { label: "Viewer", icon: <Users className="w-3.5 h-3.5" />, color: "text-muted-foreground" },
  agent: { label: "Agent", icon: <ShieldCheck className="w-3.5 h-3.5" />, color: "text-violet-600" },
};

function getInitials(email: string) {
  return (email.split("@")[0] ?? "").slice(0, 2).toUpperCase();
}

export function MembersTab({ companyId }: { companyId: string }) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);
  const removeMutation = useRemoveCompanyMember(companyId);
  const updateMutation = useUpdateCompanyMember(companyId);

  // Dialog state
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  // We only show active members here
  const activeMembers = members.filter((m) => m.status === "active");

  const handleRemove = () => {
    if (!memberToRemove) return;
    removeMutation.mutate(memberToRemove, {
      onSuccess: () => {
        toast.success("Member removed successfully");
        setMemberToRemove(null);
      },
      onError: () => {
        toast.error("Failed to remove member");
      }
    });
  };

  const handleRoleChange = (memberId: string, newRole: CompanyRole) => {
    updateMutation.mutate(
      { memberId, data: { role: newRole } },
      {
        onSuccess: () => toast.success("Role updated successfully"),
        onError: () => toast.error("Failed to update role"),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (activeMembers.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">No active members found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeMembers.map((member) => {
        const role = ROLE_META[member.role] ?? ROLE_META.member;

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-muted/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {getInitials(member.email)}
              </div>
              <div>
                <p className="text-[14px] font-bold text-foreground">{member.email}</p>
                <div className={`flex items-center gap-1.5 mt-0.5 text-[12px] font-semibold ${role.color}`}>
                  {role.icon}
                  {role.label}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="text-[12px] font-semibold bg-muted/30 border-none rounded-lg px-3 py-1.5 cursor-pointer outline-none ring-1 ring-border/50 focus:ring-primary"
                value={member.role}
                onChange={(e) => handleRoleChange(member.id, e.target.value as CompanyRole)}
                disabled={updateMutation.isPending || member.role === "owner"}
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>

              {member.role !== "owner" && (
                <Button
                  variant="outline"
                  className="h-8 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-transparent shadow-none"
                  onClick={() => setMemberToRemove(member.id)}
                  disabled={removeMutation.isPending}
                >
                  <UserX className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <ConfirmDialog
        open={!!memberToRemove}
        onOpenChange={(open) => !open && setMemberToRemove(null)}
        onConfirm={handleRemove}
        title="Remove Member?"
        description="Are you sure you want to remove this member from the organization? They will lose all access."
        confirmText="Remove"
        variant="destructive"
        isPending={removeMutation.isPending}
      />
    </div>
  );
}
