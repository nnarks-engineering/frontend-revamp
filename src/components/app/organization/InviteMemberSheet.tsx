import { useState } from "react";

import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useInviteCompanyMember } from "@/shared/hooks/company/use-company-members";
import { CompanyRole} from "@/types";

interface InviteMemberDialogProps {
 readonly companyId: string;
 readonly open: boolean;
 readonly onOpenChange: (open: boolean) => void;
}

export function InviteMemberDialog({ companyId, open, onOpenChange }: InviteMemberDialogProps) {
  const inviteMutation = useInviteCompanyMember(companyId);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>(CompanyRole.member);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInvite = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email) { setErrorMsg("Email is required."); return; }
    inviteMutation.mutate(
      { email, role },
      {
        onSuccess: () => {
          setEmail("");
          setRole(CompanyRole.member);
          onOpenChange(false);
          toast.success("Invitation sent successfully");
        },
        onError: (err: Error) => {
          setErrorMsg(err.message || "Failed to send invitation.");
          toast.error("Failed to send invitation");
        },
      }
    );
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) {
          setEmail("");
          setRole(CompanyRole.member);
          setErrorMsg("");
        }
      }}
    >

      <SheetContent side="right" className="p-0 sm:max-w-md w-full flex flex-col" aria-describedby={undefined}>
        <div className="h-full flex flex-col">
          <SheetHeader>
            <SheetTitle>Invite Member</SheetTitle>
            <SheetDescription>Send an email invitation to add someone to your organization.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <form id="invite-form" onSubmit={handleInvite} className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label htmlFor="invite-email" className="text-sm font-medium text-foreground">Email address</label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  className=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={inviteMutation.isPending}
                  autoFocus
                />
                {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
              </div>
<Select
onValueChange={(value) => setRole(value as CompanyRole)}
value={role}
disabled={inviteMutation.isPending}
>
<SelectTrigger className="w-full">
  <SelectValue placeholder="Select role" />
</SelectTrigger>
<SelectContent >
  <SelectItem value={CompanyRole.admin}>Admin</SelectItem>
  <SelectItem value={CompanyRole.member}>Member</SelectItem>
  <SelectItem value={CompanyRole.viewer}>Viewer</SelectItem>
  <SelectItem value={CompanyRole.agent}>Agent</SelectItem>
</SelectContent>

</Select>
            </form>
          </div>

          <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-muted/20">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={inviteMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" form="invite-form" className="gap-2" disabled={inviteMutation.isPending}>
              {inviteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Invite
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
