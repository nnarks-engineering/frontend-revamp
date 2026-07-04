import { useState } from "react";
import { Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateMilestone } from "@/shared/hooks/project/use-projects";
import { useCurrentProfile } from "@/shared/hooks/auth/use-auth";

interface AddMilestoneDrawerProps {
  readonly projectId: string;
  readonly nextPosition: number;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly fallbackCompanyId?: string;
}

export function AddMilestoneDrawer({
  projectId,
  nextPosition,
  open,
  onOpenChange,
  fallbackCompanyId,
}: AddMilestoneDrawerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: profile } = useCurrentProfile();
  const createMilestone = useCreateMilestone(projectId);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBudgetAmount("");
    setStartDate("");
    setEndDate("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  const handleSave = async () => {
    const activeCompanyId = profile?.company_id || fallbackCompanyId;

    if (!activeCompanyId) {
      toast.error("You must belong to a company to create a milestone");
      return;
    }

    try {
      await createMilestone.mutateAsync({
        company_id: activeCompanyId,
        title,
        description,
        position: nextPosition,
        budget_amount: Number(budgetAmount),
        start_date: startDate,
        end_date: endDate,
      });
      toast.success("Milestone created successfully");
      handleOpenChange(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.detail) {
        toast.error(
          typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : "Failed to create milestone"
        );
      } else {
        toast.error("Failed to create milestone");
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add Milestone</SheetTitle>
          <SheetDescription>
            Define a new phase or deliverable for this project.
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Milestone Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Site Preparation"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of what will be achieved..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Budget Amount (GHS)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={createMilestone.isPending || !title || !startDate || !endDate}
          >
            {createMilestone.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
