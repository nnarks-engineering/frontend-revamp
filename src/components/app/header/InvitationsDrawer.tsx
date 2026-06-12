import { useState } from "react";

import { Building2, Check, X, ChevronDown, ChevronUp, Loader2, Mail } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useMyInvitations, useAcceptCompanyInvitation, useRejectCompanyInvitation } from "@/shared/hooks/company/use-company-members";



interface InvitationsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function InvitationsDrawer({ open, onClose }: InvitationsDrawerProps) {
  const { data: invitations = [], isLoading } = useMyInvitations();
  const acceptMutation = useAcceptCompanyInvitation();
  const rejectMutation = useRejectCompanyInvitation();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: "accept" | "reject"; token: string } | null>(null);

  const handleAccept = () => {
    if (!confirmAction) return;
    acceptMutation.mutate(confirmAction.token, {
      onSuccess: () => {
        toast.success("Invitation accepted!");
        setConfirmAction(null);
      },
      onError: () => toast.error("Failed to accept invitation"),
    });
  };

  const handleReject = () => {
    if (!confirmAction) return;
    rejectMutation.mutate(confirmAction.token, {
      onSuccess: () => {
        toast.success("Invitation declined");
        setConfirmAction(null);
      },
      onError: () => toast.error("Failed to decline invitation"),
    });
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-70 h-full w-full max-w-100 bg-white dark:bg-slate-950 shadow-2xl border-l border-border/50 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <Mail className="size-4.5 text-primary" />
            <h2 className="text-[15px] font-semibold text-foreground">Invitations</h2>
            {invitations.length > 0 && (
              <span className="text-[11px] font-semibold text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                {invitations.length}
              </span>
            )}
          </div>
          <button
          type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-56px)] p-4 space-y-3">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm">Loading invitations...</p>
            </div>
          )}

          {!isLoading && invitations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Mail className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">No pending invitations</p>
              <p className="text-xs mt-1 text-muted-foreground/70">You&apos;re all caught up!</p>
            </div>
          )}

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {invitations.map((inv: any) => {
            const isExpanded = expandedId === inv.member.id;
            return (
              <div
                key={inv.member.id}
                className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden transition-all duration-200 hover:border-primary/30"
              >
                {/* Summary Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : inv.member.id)}
                  className="w-full flex items-center gap-3 p-3.5 text-left transition-colors hover:bg-muted/40"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    {inv.company.avatar_url ? (
                      <img
                        src={inv.company.avatar_url}
                        alt={inv.company.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-foreground truncate">
                      {inv.company.name || "Unnamed Company"}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Invited as <span className="capitalize font-medium text-foreground">{inv.member.role}</span>
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 space-y-3 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
                    {inv.company.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {inv.company.description}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Role</span>
                        <p className="font-medium capitalize text-foreground">{inv.member.role}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Invited</span>
                        <p className="font-medium text-foreground">
                          {new Date(inv.member.invited_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setConfirmAction({ type: "reject", token: inv.member.invite_token })}
                        disabled={rejectMutation.isPending}
                      >
                        <X className="w-3.5 h-3.5 mr-1.5" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => setConfirmAction({ type: "accept", token: inv.member.invite_token })}
                        disabled={acceptMutation.isPending}
                      >
                        <Check className="w-3.5 h-3.5 mr-1.5" />
                        Accept
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={confirmAction?.type === "accept"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        onConfirm={handleAccept}
        title="Accept Invitation?"
        description="You will be added to this organization and gain access to its resources."
        confirmText="Accept"
        variant="primary"
        isPending={acceptMutation.isPending}
      />
      <ConfirmDialog
        open={confirmAction?.type === "reject"}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        onConfirm={handleReject}
        title="Decline Invitation?"
        description="Are you sure? You will need a new invite if you change your mind."
        confirmText="Decline"
        variant="destructive"
        isPending={rejectMutation.isPending}
      />
    </>,
    document.body
  );
}
