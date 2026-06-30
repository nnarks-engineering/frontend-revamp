import { Link } from "@tanstack/react-router";
import { DetailField } from "@/components/common/DetailField";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ProjectResponse } from "@/types/projects";

interface ProjectCardProps {
  readonly project: ProjectResponse;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to="/projects/$projectId" params={{ projectId: project.id }} className="block hover:opacity-90 transition-opacity">
      <Card className="gap-2 @container border-0 @md:p-4 border-border/40 hover:border-primary/40 transition-colors bg-background-space">
        <CardContent className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-6">
            {/* <DetailField
              label="Project Name"
              value={<span className="font-semibold text-foreground">{project.title}</span>}
            />
            <DetailField
              label="Project Type"
              value={<span className="capitalize">{project.project_type.toLowerCase().replace(/_/g, " ")}</span>}
            />
            <DetailField
              label="Industry"
              value={<span className="capitalize">{project.industry.toLowerCase().replace(/_/g, " ")}</span>}
            /> */}
            <DetailField
              label="Budget"
              value={<span className="font-medium text-foreground">{formatMoney(Number(project.total_budget), project.currency)}</span>}
            />
            <DetailField
              label="Start Date"
              value={formatDate(project.start_date)}
            />
            <DetailField
              label="End Date"
              value={formatDate(project.end_date)}
            />
            <DetailField
              label="Assigned Company"
              value={"-"} // To be populated if member details are fetched
            />
            <DetailField
              label="Status"
              value={<StatusBadge variant={project.status} />}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
