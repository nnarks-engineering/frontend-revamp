import { useState } from "react";
import {
  useCompanyMembers,
  useInviteCompanyMember,
  useRemoveCompanyMember,
  useResendCompanyInvitation,
} from "@/shared/hooks/use-company-members";
import { Button } from "@/components/ui/button";
import type { CompanyRole } from "@/types/enums";
import { Mail, Clock, Trash2, Send, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export function InvitationsTab({ companyId }: { companyId: string }) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);
  const inviteMutation = useInviteCompanyMember(companyId);
  const removeMutation = useRemoveCompanyMember(companyId);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>("member");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Dialog state
  const [memberToRevoke, setMemberToRevoke] = useState<string | null>(null);
  const [memberToResend, setMemberToResend] = useState<string | null>(null);

  const pendingInvites = members.filter((m) => m.status === "pending");
  const resendMutation = useResendCompanyInvitation(companyId);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Email is required.");
      return;
    }

    inviteMutation.mutate(
      { email, role },
      {
        onSuccess: () => {
          setEmail("");
          setRole("member");
          toast.success("Invitation sent successfully");
        },
        onError: (err: any) => {
          setErrorMsg(err.message || "Failed to send invitation.");
          toast.error("Failed to send invitation");
        },
      }
    );
  };

  const handleRevoke = () => {
    if (!memberToRevoke) return;
    removeMutation.mutate(memberToRevoke, {
      onSuccess: () => {
        toast.success("Invitation revoked");
        setMemberToRevoke(null);
      },
      onError: () => {
        toast.error("Failed to revoke invitation");
      }
    });
  };

  const handleResend = () => {
    if (!memberToResend) return;
    resendMutation.mutate(memberToResend, {
      onSuccess: () => {
        toast.success("Invitation resent successfully");
        setMemberToResend(null);
      },
      onError: () => {
        toast.error("Failed to resend invitation");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* ── Invite Form ──────────────────────────────────────────────── */}
      <div className="bg-muted/10 p-5 rounded-xl border border-border/40">
        <h3 className="text-sm font-bold text-foreground mb-1">Invite a new member</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Send an email invitation to add someone to your organization.
        </p>

        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="flex-1 w-full">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={inviteMutation.isPending}
            />
            {errorMsg && <p className="text-xs text-destructive mt-1.5">{errorMsg}</p>}
          </div>

          <select
            className="h-10 px-3 text-sm font-semibold rounded-lg border border-border bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-40"
            value={role}
            onChange={(e) => setRole(e.target.value as CompanyRole)}
            disabled={inviteMutation.isPending}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="viewer">Viewer</option>
          </select>

          <Button type="submit" className="h-10 w-full sm:w-auto gap-2" disabled={inviteMutation.isPending}>
            {inviteMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send Invite
          </Button>
        </form>
      </div>

      {/* ── Pending Invites List ─────────────────────────────────────── */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Pending Invitations ({pendingInvites.length})
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : pendingInvites.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border/60 rounded-xl">
            <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-xs text-muted-foreground">No pending invitations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground">{invite.email}</p>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                      Role: {invite.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-8 px-3 text-xs text-primary hover:bg-primary/10 hover:text-primary border-transparent shadow-none"
                    onClick={() => setMemberToResend(invite.id)}
                    disabled={resendMutation.isPending}
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    Resend
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-8 px-3 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive border-transparent shadow-none"
                    onClick={() => setMemberToRevoke(invite.id)}
                    disabled={removeMutation.isPending}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!memberToRevoke}
        onOpenChange={(open) => !open && setMemberToRevoke(null)}
        onConfirm={handleRevoke}
        title="Revoke Invitation?"
        description="Are you sure you want to revoke this invitation? This action cannot be undone."
        confirmText="Revoke"
        variant="destructive"
        isPending={removeMutation.isPending}
      />

      <ConfirmDialog
        open={!!memberToResend}
        onOpenChange={(open) => !open && setMemberToResend(null)}
        onConfirm={handleResend}
        title="Resend Invitation?"
        description="Are you sure you want to resend the invitation email to this member?"
        confirmText="Resend"
        variant="primary"
        isPending={resendMutation.isPending}
      />
    </div>
  );
}
