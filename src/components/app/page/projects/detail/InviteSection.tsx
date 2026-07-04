import { useState } from "react";
import { isAxiosError } from "axios";
import { Loader2, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchCompanies } from "@/shared/hooks/companies/use-companies";
import { useInviteMember } from "@/shared/hooks/project/use-projects";

type InviteMode = "none" | "email" | "company";

interface InviteSectionProps {
  readonly projectId: string;
  /** Compact mode for inline cards (supervisor card, etc.) */
  readonly compact?: boolean;
}

export function InviteSection({ projectId, compact }: InviteSectionProps) {
  const [inviteMode, setInviteMode] = useState<InviteMode>("none");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: companies = [], isLoading: isLoadingCompanies } =
    useSearchCompanies(searchQuery);
  const inviteMember = useInviteMember(projectId);

  const companyOptions = companies.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleError = (e: unknown, fallback: string) => {
    if (isAxiosError(e) && e.response?.data?.detail) {
      toast.error(
        typeof e.response.data.detail === "string"
          ? e.response.data.detail
          : fallback
      );
    } else {
      toast.error(fallback);
    }
  };

  const handleInviteByEmail = async () => {
    if (!emailToInvite) return;
    try {
      await inviteMember.mutateAsync({ email: emailToInvite });
      toast.success(`Invited ${emailToInvite} successfully!`);
      setEmailToInvite("");
      setInviteMode("none");
    } catch (e) {
      handleError(e, "Failed to send invitation.");
    }
  };

  const handleCompanySelect = async (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (!company) return;
    try {
      await inviteMember.mutateAsync({ email: company.email });
      toast.success(`Invited ${company.name} successfully!`);
      setInviteMode("none");
      setSearchQuery("");
    } catch (e) {
      handleError(e, "Failed to invite company.");
    }
  };

  if (inviteMode === "none") {
    return (
      <div className={compact ? "flex gap-2" : "flex flex-col gap-2"}>
        <Button
          variant="outline"
          size="sm"
          className={compact ? "gap-1.5 text-xs" : "w-full gap-2 justify-start"}
          onClick={() => setInviteMode("email")}
        >
          <Mail className="w-3.5 h-3.5" />
          {compact ? "Email" : "Invite by Email"}
        </Button>
        <Button
          size="sm"
          className={compact ? "gap-1.5 text-xs" : "w-full gap-2 justify-start"}
          onClick={() => setInviteMode("company")}
        >
          <UserPlus className="w-3.5 h-3.5" />
          {compact ? "Company" : "Invite Nnarks Partner"}
        </Button>
      </div>
    );
  }

  if (inviteMode === "email") {
    return (
      <div className="space-y-3 animate-in fade-in">
        <Label className="text-xs">Invite by Email</Label>
        <Input
          type="email"
          placeholder="partner@example.com"
          value={emailToInvite}
          onChange={(e) => setEmailToInvite(e.target.value)}
          className="h-9"
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleInviteByEmail}
            disabled={!emailToInvite || inviteMember.isPending}
            className="gap-1.5 flex-1"
          >
            {inviteMember.isPending && (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            )}
            Send
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInviteMode("none")}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in">
      <div className="flex items-center justify-between">
        <Label className="text-xs">Search Company</Label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2"
          onClick={() => setInviteMode("none")}
        >
          Cancel
        </Button>
      </div>
      <Combobox
        placeholder={
          isLoadingCompanies ? "Loading..." : "Search companies..."
        }
        value=""
        onChange={handleCompanySelect}
        onSearchChange={setSearchQuery}
        options={companyOptions}
        sortOrder="none"
      />
      {inviteMember.isPending && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" /> Inviting…
        </p>
      )}
    </div>
  );
}
