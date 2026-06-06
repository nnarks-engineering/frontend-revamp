import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Send, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useInviteCompanyMember } from "@/shared/hooks/use-company-members";
import type { CompanyRole } from "@/types/enums";
import RoundingLine from "@/assets/svg/rounding-line.svg?react";

interface InviteMemberDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberDialog({ companyId, open, onOpenChange }: InviteMemberDialogProps) {
  const inviteMutation = useInviteCompanyMember(companyId);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>("member");
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
          setRole("member"); 
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
          setRole("member"); 
          setErrorMsg(""); 
        } 
      }}
    >
      <SheetContent side="right" className="p-0 sm:max-w-md w-full flex flex-col bg-background">
        <div className="h-full flex flex-col">
          <div className="bg-tertiary relative overflow-hidden shrink-0 px-6 pt-6 pb-5 border-b border-tertiary-600/20">
            <RoundingLine className="absolute z-0 -top-6 left-0 text-tertiary-400 opacity-50 scale-x-[-1]" aria-hidden />
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-3xl leading-none font-millik text-tertiary-foreground">Invite Member</h2>
                <p className="text-tertiary-foreground/75 mt-2 text-base">Send an email invitation to add someone to your organization.</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="p-2 -mr-2 rounded-lg text-tertiary-foreground/70 hover:text-tertiary-foreground hover:bg-black/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-6">
            <form id="invite-form" onSubmit={handleInvite} className="flex flex-col gap-5">
              <div className="space-y-1.5">
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
              <div className="space-y-1.5">
                <label htmlFor="invite-role" className="text-sm font-medium text-foreground">Role</label>
                <select
                  id="invite-role"
                  className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={role}
                  onChange={(e) => setRole(e.target.value as CompanyRole)}
                  disabled={inviteMutation.isPending}
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
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
