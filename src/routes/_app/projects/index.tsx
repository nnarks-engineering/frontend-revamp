import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, FilterTabs, ProgressDots, StatusBadge } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS } from "@/data/mock/projects";

export const Route = createFileRoute("/_app/projects/")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Active", "Completed", "Archived"];

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <PageHeader
        title="Projects"
        subtitle="Manage your escrow projects and milestones"
      >
        <Button variant="default">+ New Project</Button>
      </PageHeader>

      <FilterTabs tabs={filters} active={filter} onTabChange={setFilter} />

      {/* List Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-[13px] font-medium tracking-wider uppercase text-muted-foreground border-b border-border/60 px-4 pb-2">
        <div>Project Name</div>
        <div>Role</div>
        <div>Progress</div>
        <div>Value</div>
        <div className="text-right">Last Activity</div>
      </div>

      {/* List Body */}
      <div className="flex flex-col">
        {filteredProjects.map((project) => {
          const completedMilestones = project.milestones.filter(
            (m) => m.status === "APPROVED" || m.status === "SKIPPED"
          ).length;

          return (
            <Link
              key={project.id}
              to={`/projects/$projectId`}
              params={{ projectId: project.id }}
              className="group grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center px-4 py-3 rounded-md hover:bg-muted/40 transition-colors"
            >
              <div className="text-[15px] font-medium text-foreground">
                {project.title}
              </div>
              <div>
                <StatusBadge status={project.members.find(m => m.company_id === project.owner_company_id)?.role || "OWNER"} />
              </div>
              <div>
                <ProgressDots
                  total={project.milestones.length}
                  completed={completedMilestones}
                />
              </div>
              <div className="font-geist text-[15px] font-medium">
                ${project.total_budget.toLocaleString()}
              </div>
              <div className="text-[13px] text-muted-foreground text-right">
                {/* Normally format distance to now */}
                {new Date(project.start_date).toLocaleDateString()}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
