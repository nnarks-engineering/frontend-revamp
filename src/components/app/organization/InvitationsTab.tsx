import { useState } from "react";
import {
  useCompanyMembers,
  useInviteCompanyMember,
  useRemoveCompanyMember,
  useResendCompanyInvitation,
} from "@/shared/hooks/use-company-members";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState, Pagination } from "@/components/app/shared";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CompanyMemberStatus, CompanyRole } from "@/types/enums";
import { ChevronLeft, ChevronRight, RefreshCw, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ (\d{4})$/, ", $1");
}

function statusVariant(status: CompanyMemberStatus): string {
  const map: Record<CompanyMemberStatus, string> = {
    active: "active",
    pending: "pending",
    removed: "cancelled",
    left: "ended",
  };
  return map[status] ?? "default";
}

interface InvitationsTabProps {
  readonly companyId: string;
  readonly search: string;
  readonly page: number;
  readonly onPageChange: (page: number) => void;
  readonly inviteOpen: boolean;
  readonly onInviteOpenChange: (open: boolean) => void;
}

export function InvitationsTab({ companyId, search, page, onPageChange, inviteOpen, onInviteOpenChange }: InvitationsTabProps) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);
  const inviteMutation = useInviteCompanyMember(companyId);
  const removeMutation = useRemoveCompanyMember(companyId);
  const resendMutation = useResendCompanyInvitation(companyId);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>("member");
  const [errorMsg, setErrorMsg] = useState("");
  const [memberToRevoke, setMemberToRevoke] = useState<string | null>(null);
  const [memberToResend, setMemberToResend] = useState<string | null>(null);

  // Show ALL members, filtered by search
  const filtered = search.trim()
    ? members.filter((m) => m.email.toLowerCase().includes(search.toLowerCase()))
    : members;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleInvite = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email) { setErrorMsg("Email is required."); return; }
    inviteMutation.mutate(
      { email, role },
      {
        onSuccess: () => { setEmail(""); setRole("member"); onInviteOpenChange(false); toast.success("Invitation sent successfully"); },
        onError: (err: Error) => { setErrorMsg(err.message || "Failed to send invitation."); toast.error("Failed to send invitation"); },
      }
    );
  };

  const handleRevoke = () => {
    if (!memberToRevoke) return;
    removeMutation.mutate(memberToRevoke, {
      onSuccess: () => { toast.success("Invitation revoked"); setMemberToRevoke(null); },
      onError: () => toast.error("Failed to revoke invitation"),
    });
  };

  const handleResend = () => {
    if (!memberToResend) return;
    resendMutation.mutate(memberToResend, {
      onSuccess: () => { toast.success("Invitation resent successfully"); setMemberToResend(null); },
      onError: () => toast.error("Failed to resend invitation"),
    });
  };

  return (
    <div className="space-y-5">
      {/* ── Invite Dialog ───────────────────────────────────────────── */}
      <Dialog open={inviteOpen} onOpenChange={(open) => { onInviteOpenChange(open); if (!open) { setEmail(""); setRole("member"); setErrorMsg(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite a new member</DialogTitle>
            <DialogDescription>
              Send an email invitation to add someone to your organization.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="invite-email" className="text-sm font-medium text-foreground">Email address</label>
              <input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={inviteMutation.isPending}
                autoFocus
              />
              {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="invite-role" className="text-sm font-medium text-foreground">Role</label>
              <select
                id="invite-role"
                className="h-10 px-3 text-sm rounded-lg border border-border bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={role}
                onChange={(e) => setRole(e.target.value as CompanyRole)}
                disabled={inviteMutation.isPending}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onInviteOpenChange(false)}
                disabled={inviteMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-2" disabled={inviteMutation.isPending}>
                {inviteMutation.isPending
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send className="w-4 h-4" />}
                Send Invite
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-background">
        <Table className="table-fixed w-full">
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-foreground">Email</TableHead>
              <TableHead className="font-bold text-foreground">Role</TableHead>
              <TableHead className="font-bold text-foreground">Date Invited</TableHead>
              <TableHead className="font-bold text-foreground">Status</TableHead>
              <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoading) {
                return (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
              if (pageItems.length === 0) {
                return (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={5} className="py-16 text-center text-muted-foreground">
                      <EmptyState
                        title="No members found"
                        description={search ? `No members matching "${search}".` : "No members found."}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
              return pageItems.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="text-foreground/80">{member.email}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{member.role}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(member.invited_at)}</TableCell>
                  <TableCell>
                    <StatusBadge variant={statusVariant(member.status)} size="sm" />
                  </TableCell>
                  <TableCell className="text-right">
                    {member.status === "pending" && (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-primary hover:bg-primary/10 hover:text-primary border-border/50 shadow-none"
                          onClick={() => setMemberToResend(member.id)}
                          disabled={resendMutation.isPending}
                          title="Resend invitation"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive border-border/50 shadow-none"
                          onClick={() => setMemberToRevoke(member.id)}
                          disabled={removeMutation.isPending}
                          title="Revoke invitation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ));
            })()}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ──────────────────────────────────────────────── */}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

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
        description="Resend the invitation email to this member?"
        confirmText="Resend"
        variant="primary"
        isPending={resendMutation.isPending}
      />
    </div>
  );
}
