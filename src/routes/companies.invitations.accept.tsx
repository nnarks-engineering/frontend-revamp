import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { acceptCompanyInvitation } from "@/shared/api/companies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QUERY_KEYS } from "@/shared/lib/constants";
import { Loader2, CheckCircle2, AlertCircle, Building2 } from "lucide-react";
import { useState } from "react";
import { requireAuth } from "@/shared/middleware";
import { useInvitationDetails, useRejectCompanyInvitation } from "@/shared/hooks/use-company-members";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

type AcceptInviteSearch = {
  token: string;
};

export const Route = createFileRoute("/companies/invitations/accept")({
  validateSearch: (search: Record<string, unknown>): AcceptInviteSearch => {
    return {
      token: (search.token as string) || "",
    };
  },
  beforeLoad: ({ context, location }) => requireAuth({ context, location }),
  component: AcceptCompanyInvitationPage,
});

function AcceptCompanyInvitationPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [hasAccepted, setHasAccepted] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const { data: details, isLoading, isError: isFetchError, error: fetchError } = useInvitationDetails(token);

  const acceptMutation = useMutation({
    mutationFn: acceptCompanyInvitation,
    onSuccess: () => {
      setHasAccepted(true);
      toast.success("Invitation accepted successfully");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myCompanies });
      setTimeout(() => {
        navigate({ to: "/org" });
      }, 3000);
    },
    onError: () => {
      toast.error("Failed to accept invitation");
    }
  });

  const rejectMutation = useRejectCompanyInvitation();

  const handleReject = () => {
    rejectMutation.mutate(token, {
      onSuccess: () => {
        toast.success("Invitation declined");
        navigate({ to: "/org" });
      },
      onError: () => {
        toast.error("Failed to decline invitation");
      }
    });
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
        <Card className="w-full max-w-md shadow-lg border-slate-200 dark:border-slate-800">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight">Company Invitation</CardTitle>
            <CardDescription>No invitation token found</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <AlertCircle className="w-16 h-16 text-amber-600 mb-4" />
            <p className="text-center font-medium">No invitation token provided in the URL.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Company Invitation
          </CardTitle>
          <CardDescription className="text-base">
            {isLoading
              ? "Fetching invitation details..."
              : hasAccepted
                ? "Invitation accepted successfully!"
                : isFetchError
                  ? "We ran into a problem"
                  : "Review your invitation below"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 min-h-[160px]">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-slate-500 animate-in fade-in">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <p>Loading invitation...</p>
            </div>
          )}

          {hasAccepted && (
            <div className="flex flex-col items-center gap-4 text-green-600 dark:text-green-500 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16" />
              <p className="text-center font-medium">You have successfully joined the company.</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Redirecting you to the dashboard...
              </p>
            </div>
          )}

          {isFetchError && (
            <div className="flex flex-col items-center gap-4 text-red-600 dark:text-red-500 animate-in zoom-in duration-300">
              <AlertCircle className="w-16 h-16" />
              <p className="text-center font-medium">
                {fetchError instanceof Error
                  ? fetchError.message
                  : "Failed to load the invitation. It may have expired or already been processed."}
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/org">Go to Dashboard</Link>
              </Button>
            </div>
          )}

          {!isLoading && !isFetchError && !hasAccepted && details && (
            <div className="flex flex-col items-center w-full animate-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                {details.company.avatar_url ? (
                  <img src={details.company.avatar_url} alt="Company" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-primary" />
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{details.company.name || "A Company"}</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                has invited you to join their team as <span className="font-semibold text-foreground capitalize">{details.member.role}</span>
              </p>

              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowRejectDialog(true)}
                  disabled={acceptMutation.isPending}
                >
                  Decline
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => acceptMutation.mutate(token)}
                  disabled={acceptMutation.isPending}
                >
                  {acceptMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Accept Invite
                </Button>
              </div>
              <button
                type="button"
                onClick={() => navigate({ to: "/org" })}
                className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Skip for now
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleReject}
        title="Decline Invitation?"
        description="Are you sure you want to decline this invitation? You will need a new invite link if you change your mind later."
        confirmText="Decline"
        variant="destructive"
        isPending={rejectMutation.isPending}
      />
    </div>
  );
}
