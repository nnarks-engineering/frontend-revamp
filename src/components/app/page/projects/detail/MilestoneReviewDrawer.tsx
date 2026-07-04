import { useState } from "react";
import { Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetBody,
  SheetFooter,
} from "@/components/ui/sheet";
import { useSubmitMilestoneReview } from "@/shared/hooks/project/use-projects";
import type { MilestoneResponse } from "@/types/projects";
import { ProjectReviewStatus } from "@/types/projects";

import { formatCurrency, formatDate} from "./helpers";
import { StatusBadge } from "@/components/ui/status-badge";

interface MilestoneReviewDrawerProps {
  readonly projectId: string;
  readonly milestone: MilestoneResponse | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly currency: string;
  readonly reviewerCompanyId: string;
  readonly reviewerRole: string;
}

export function MilestoneReviewDrawer({
  projectId,
  milestone,
  open,
  onOpenChange,
  currency,
  reviewerCompanyId,
  reviewerRole,
}: MilestoneReviewDrawerProps) {
  const [comment, setComment] = useState("");

  const submitReview = useSubmitMilestoneReview(
    projectId,
    milestone?.id ?? ""
  );

  const resetForm = () => {
    setComment("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  const handleReview = async (status: ProjectReviewStatus) => {
    if (!reviewerCompanyId || !milestone) {
      toast.error("Missing required information to submit review");
      return;
    }

    try {
      await submitReview.mutateAsync({
        company_id: reviewerCompanyId,
        reviewer_role: reviewerRole,
        status,
        comment: comment || null,
      });
      toast.success(`Milestone ${status} successfully`);
      handleOpenChange(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.detail) {
        toast.error(
          typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : "Failed to submit review"
        );
      } else {
        toast.error("Failed to submit review");
      }
    }
  };

  if (!milestone) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-muted text-muted-foreground`}
            >
              {milestone.position}
            </div>
            <SheetTitle>{milestone.title}</SheetTitle>
          </div>
          <SheetDescription>
            Review and propose changes to this milestone.
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="rounded-xl border border-border/60 bg-muted/30 space-y-4">
            <div className="flex items-center justify-between">
              <StatusBadge variant={milestone.status} />
              <span className="text-xs text-muted-foreground font-medium">
                {formatCurrency(milestone.budget_amount, currency)}
              </span>
            </div>
            {milestone.description && (
              <p className="text-sm text-foreground">{milestone.description}</p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
              <span>{formatDate(milestone.start_date)}</span>
              <span>—</span>
              <span>{formatDate(milestone.end_date)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Leave a comment (Optional)</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Suggest changes, ask questions, or provide approval reasons..."
              rows={4}
            />
          </div>
        </SheetBody>

        <SheetFooter className="flex-col gap-2">
          <Button
            onClick={() => handleReview(ProjectReviewStatus.approved)}
            disabled={submitReview.isPending}
            className="w-full"
          >
            {submitReview.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Approve Milestone
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => handleReview(ProjectReviewStatus.rejected)}
              disabled={submitReview.isPending}
              className="text-destructive hover:bg-destructive/10"
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleReview(ProjectReviewStatus.pending)}
              disabled={submitReview.isPending || !comment}
            >
              Suggest Changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
