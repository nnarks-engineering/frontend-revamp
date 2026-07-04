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
import type { ProjectDashboardResponse } from "@/types/projects";
import { useUpdateProject } from "@/shared/hooks/project/use-projects";

interface EditProjectDetailsDrawerProps {
  readonly project: ProjectDashboardResponse;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function EditProjectDetailsDrawer({
  project,
  open,
  onOpenChange,
}: EditProjectDetailsDrawerProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description ?? "");
  const [industry, setIndustry] = useState(project.industry);

  const updateProject = useUpdateProject(project.id);

  const handleSave = async () => {
    try {
      await updateProject.mutateAsync({
        title,
        description,
        industry,
      });
      toast.success("Project details updated successfully");
      onOpenChange(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.detail) {
        toast.error(
          typeof error.response.data.detail === "string"
            ? error.response.data.detail
            : "Failed to update details"
        );
      } else {
        toast.error("Failed to update project details");
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Project Details</SheetTitle>
          <SheetDescription>
            Update the basic information for your project.
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Road Construction Phase 1"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the main goal of the project"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="E.g. Construction"
              />
            </div>
          </div>
        </SheetBody>

        <SheetFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateProject.isPending}>
            {updateProject.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
