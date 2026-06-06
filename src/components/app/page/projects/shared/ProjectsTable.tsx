import { Link } from "@tanstack/react-router";
import { EmptyState, StatusBadge } from "@/components/app/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Project } from "@/types/projects";

interface ProjectsTableProps {
  projects: readonly Project[];
  isLoading: boolean;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProjectsTable({ projects, isLoading }: ProjectsTableProps) {
  return (
    <div className=" overflow-hidden bg-background">
      <Table className="table-fixed w-full">
        <colgroup>
          <col className="w-[32%]" />
          <col className="w-[14%]" />
          <col className="w-[14%]" />
          <col className="w-[16%]" />
          <col className="w-[24%]" />
        </colgroup>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead >Project Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Timeline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="py-16 text-center">
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : projects.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="py-16 text-center text-muted-foreground">
                <EmptyState
                  title="No projects found"
                  description="There are no projects for this status right now."
                />
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                </TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className="text-muted-foreground capitalize">
                  {project.project_type.toLowerCase()}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {formatMoney(project.total_budget, project.currency)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(project.start_date)} - {formatDate(project.end_date)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
