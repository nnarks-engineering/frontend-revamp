import { useState } from "react";

import { ShieldCheck, UserX, Crown, Users} from "lucide-react";
import { toast } from "sonner";

import NoUsersSvg from "@/assets/svg/no-users.svg?react";
import { EmptyState, Pagination } from "@/components/app/shared";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useUpdateCompanyMember,
} from "@/shared/hooks/company/use-company-members";
import type { CompanyRole } from "@/types";
import { CompanyMemberStatus } from "@/types";

const PAGE_SIZE = 10;

const ROLE_META: Record<CompanyRole, { label: string; icon: React.ReactNode; color: string }> = {
  owner: { label: "Owner", icon: <Crown className="w-3.5 h-3.5" />, color: "text-amber-600" },
  admin: { label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" />, color: "text-primary" },
  member: { label: "Member", icon: <Users className="w-3.5 h-3.5" />, color: "text-foreground/70" },
  viewer: { label: "Viewer", icon: <Users className="w-3.5 h-3.5" />, color: "text-muted-foreground" },
  agent: { label: "Agent", icon: <ShieldCheck className="w-3.5 h-3.5" />, color: "text-violet-600" },
};

function getInitials(name: string) {
  return (name.split("@")[0] ?? "").slice(0, 2).toUpperCase();
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ (\d{4})$/, ", $1");
}

interface MembersTabProps {
  readonly companyId: string;
  readonly search: string;
  readonly page: number;
  readonly onPageChange: (page: number) => void;
}

export function MembersTab({ companyId, search, page, onPageChange }: MembersTabProps) {
  const { data: members = [], isLoading } = useCompanyMembers(companyId);
  const removeMutation = useRemoveCompanyMember(companyId);
  const updateMutation = useUpdateCompanyMember(companyId);

  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const activeMembers = members.filter((m) => m.status === CompanyMemberStatus.active);

  const filtered = search.trim()
    ? activeMembers.filter((m) => m.email.toLowerCase().includes(search.toLowerCase()))
    : activeMembers;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleRemove = () => {
    if (!memberToRemove) return;
    removeMutation.mutate(memberToRemove, {
      onSuccess: () => { toast.success("Member removed successfully"); setMemberToRemove(null); },
      onError: () => toast.error("Failed to remove member"),
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

  return (
    <div className="space-y-5">
      {/* ── Table ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-background">
        <Table className="table-fixed w-full">
          <colgroup>
            <col className="w-[35%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[25%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-foreground">Member</TableHead>
              <TableHead className="font-bold text-foreground">Role</TableHead>
              <TableHead className="font-bold text-foreground">Date Joined</TableHead>
              <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoading) {
                return (
                  <TableRow>
                    <TableCell colSpan={4} className="py-16 text-center">
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
                    <TableCell colSpan={4} className="py-16 text-center text-muted-foreground">
                      <EmptyState
                        svgIcon={NoUsersSvg}
                        svgClassName="w-32"
                        title="No members found"
                        description={search ? `No members matching "${search}".` : "No active members found."}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
              return pageItems.map((member) => {
                const role = ROLE_META[member.role] ?? ROLE_META.member;
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {getInitials(member.first_name || member.email)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-foreground/80 truncate font-medium">
                            {member.first_name || member.last_name 
                              ? `${member.first_name || ""} ${member.last_name || ""}`.trim() 
                              : member.email}
                          </span>
                          {(member.first_name || member.last_name) && (
                            <span className="text-[11px] text-muted-foreground truncate">{member.email}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* <div className={`flex items-center gap-1.5 text-sm font-semibold ${role.color}`}>
                        {role.icon}
                        {role.label}
                      </div> */}
                       <StatusBadge variant={role.label} size="sm" />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(member.joined_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {member.role !== "owner" && (
                          <Select
                            value={member.role}
                            onValueChange={(v) => handleRoleChange(member.id, v as CompanyRole)}
                            disabled={updateMutation.isPending}
                          >
                            <SelectTrigger className="h-7 w-28 text-xs font-semibold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        {member.role !== "owner" && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive border-border/50 shadow-none"
                            onClick={() => setMemberToRemove(member.id)}
                            disabled={removeMutation.isPending}
                            title="Remove member"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              });
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
