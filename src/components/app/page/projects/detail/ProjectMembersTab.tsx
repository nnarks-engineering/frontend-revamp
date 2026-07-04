import { useState } from "react";
import { isAxiosError } from "axios";
import {Mail, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image } from "@/components/image/Image";
import { useInviteMember } from "@/shared/hooks/project/use-projects";
import { useSearchCompanies } from "@/shared/hooks/companies/use-companies";
import type { ProjectDashboardResponse } from "@/types/projects";

type InviteMode = "none" | "email" | "company";

export function ProjectMembersTab({ project }: { project: ProjectDashboardResponse }) {
  const [inviteMode, setInviteMode] = useState<InviteMode>("none");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: companies = [], isLoading: isLoadingCompanies } = useSearchCompanies(searchQuery);
  const inviteMember = useInviteMember(project.id);

  const companyOptions = companies.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleInviteByEmail = async () => {
    if (!emailToInvite) return;
    try {
      await inviteMember.mutateAsync({ email: emailToInvite });
      toast.success(`Invited ${emailToInvite} successfully!`);
      setEmailToInvite("");
      setInviteMode("none");
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.detail) {
        toast.error(typeof e.response.data.detail === "string" ? e.response.data.detail : "Failed to send invitation.");
      } else {
        toast.error("Failed to send invitation.");
      }
    }
  };

  const handleCompanySelect = async (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;

    try {
      // Invite the company by its email
      await inviteMember.mutateAsync({ email: company.email });
      toast.success(`Invited ${company.name} successfully!`);
      setInviteMode("none");
      setSearchQuery("");
    } catch (e) {
      if (isAxiosError(e) && e.response?.data?.detail) {
        toast.error(typeof e.response.data.detail === "string" ? e.response.data.detail : "Failed to invite company.");
      } else {
        toast.error("Failed to invite company.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold font-millik">Project Members</h3>
          <p className="text-sm text-muted-foreground">Manage partners and supervisors assigned to this project.</p>
        </div>

        {inviteMode === "none" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setInviteMode("email")} className="gap-2">
              <Mail className="w-4 h-4" />
              Invite by Email
            </Button>
            <Button size="sm" onClick={() => setInviteMode("company")} className="gap-2">
              <ShieldCheck className="w-4 h-4" />
              Invite Nnarks Partner
            </Button>
          </div>
        )}
      </div>

      {inviteMode === "email" && (
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 animate-in fade-in space-y-4">
          <Label>Invite Partner by Email</Label>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="partner@example.com"
              value={emailToInvite}
              onChange={(e) => setEmailToInvite(e.target.value)}
              className="bg-background max-w-md"
            />
            <Button onClick={handleInviteByEmail} disabled={!emailToInvite || inviteMember.isPending} className="gap-2">
              {inviteMember.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Send Invite
            </Button>
            <Button variant="ghost" onClick={() => setInviteMode("none")}>Cancel</Button>
          </div>
        </div>
      )}

      {inviteMode === "company" && (
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 animate-in fade-in space-y-4">
          <div className="flex items-center justify-between">
            <Label>Search and Invite Nnarks Partner</Label>
            <Button variant="ghost" size="sm" onClick={() => setInviteMode("none")}>Cancel</Button>
          </div>
          <div className="max-w-md">
            <Combobox
              placeholder={isLoadingCompanies ? "Loading..." : "Type to search companies..."}
              value=""
              onChange={handleCompanySelect}
              onSearchChange={setSearchQuery}
              options={companyOptions}
              sortOrder="none"
            />
          </div>
          {inviteMember.isPending && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Sending invitation...
            </div>
          )}
        </div>
      )}

      {(!project.members || project.members.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border rounded-xl border-dashed">
          <p>No members have been assigned to this project yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-background rounded-xl border border-border/60 mt-2">
          <Table className="table-fixed w-full">
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[30%]" />
              <col className="w-[20%]" />
            </colgroup>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-foreground">Member</TableHead>
                <TableHead className="font-bold text-foreground">Status</TableHead>
                <TableHead className="font-bold text-foreground text-right">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt={m.email}
                        fullName={m.email}
                        className="aspect-square rounded-full  shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-foreground/80 truncate font-medium">
                          {m.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-muted-foreground">
                      {m.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge variant={m.role} size="sm" className="ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
