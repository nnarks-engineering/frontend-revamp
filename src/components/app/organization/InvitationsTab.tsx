import { RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState, Pagination } from "@/components/app/shared";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCompanyMembers,
  useRemoveCompanyMember,
  useResendCompanyInvitation,
} from "@/shared/hooks/company/use-company-members";


const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ (\d{4})$/, ", $1");
}

interface InvitationsTabProps {
  readonly companyId: string;
  readonly search: string;
  readonly page: number;
  readonly onPageChange: (page: number) => void;
}

export function InvitationsTab({ companyId, search, page, onPageChange }: InvitationsTabProps) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);
  const removeMutation = useRemoveCompanyMember(companyId);
  const resendMutation = useResendCompanyInvitation(companyId);

  const [memberToRevoke, setMemberToRevoke] = useState<string | null>(null);
  const [memberToResend, setMemberToResend] = useState<string | null>(null);

  // Show ALL members, filtered by search
  const filtered = search.trim()
    ? members.filter((m) => m.email.toLowerCase().includes(search.toLowerCase()))
    : members;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

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
                    <StatusBadge variant={member.status} />
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
