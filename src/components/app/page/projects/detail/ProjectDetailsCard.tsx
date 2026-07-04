import { useState } from "react";
import { Building2, Calendar, Edit2, Lock, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProjectDashboardResponse } from "@/types/projects";

import { formatDate } from "./helpers";
import { EditProjectDetailsDrawer } from "./EditProjectDetailsDrawer";

interface ProjectDetailsCardProps {
  readonly project: ProjectDashboardResponse;
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Card className="w-full p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold font-millik text-foreground">
            Project Details
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {project.description || "No description provided."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/40">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Timeline</span>
            </div>
            <p className="text-sm font-medium text-foreground pl-6">
              {formatDate(project.start_date)} — {formatDate(project.end_date)}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Location</span>
            </div>
            <p className="text-sm font-medium text-foreground pl-6 truncate">
              {project.location_address?.city},{" "}
              {project.location_address?.country_name ||
                project.location_address?.country_code}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Industry</span>
            </div>
            <p className="text-sm font-medium text-foreground pl-6 capitalize">
              {project.industry}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider">Supervision</span>
            </div>
            <p className="text-sm font-medium text-foreground pl-6 capitalize">
              {project.supervision_level?.replace(/_/g, " ")}
            </p>
          </div>
        </div>
      </Card>

      <EditProjectDetailsDrawer
        project={project}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
