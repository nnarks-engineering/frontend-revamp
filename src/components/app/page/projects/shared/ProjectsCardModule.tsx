import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { Plus, Search, ListFilter } from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { EmptyState } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
  ModuleLayoutToolbar,
  ModuleLayoutToolbarCenter,
  ModuleLayoutToolbarRight,
} from "@/components/ui/module-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/shared/hooks/project/use-projects";
import type { ProjectListTab } from "@/types/project-list";

import { PROJECT_TABS, PROJECTS_PAGE_SIZE, CREATE_PROJECT_ROUTE } from "./constants";
import { useProjectTabCounts, useProjectTabFilter } from "./hooks/use-project-tab-filter";
import { ProjectCard } from "./ProjectCard";

export function ProjectsCardModule() {
  const [tab, setTab] = useState<ProjectListTab>("active");
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useProjects({ page: 1, size: PROJECTS_PAGE_SIZE });
  const items = data?.items ?? [];
  const counts = useProjectTabCounts(items);
  const filteredProjects = useProjectTabFilter(items, tab);

  const goToCreate = () => {
    navigate({ to: CREATE_PROJECT_ROUTE }).catch(() => { });
  };

  return (
    <ModuleLayout className="w-full h-full flex flex-col min-h-0">
      <ModuleLayoutHeader variant="primary">
        <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none" aria-hidden />

        <ModuleLayoutHeaderContent>
          <ModuleLayoutTitle>Projects</ModuleLayoutTitle>
          <ModuleLayoutDescription>
            Manage your escrow projects and milestones
          </ModuleLayoutDescription>
        </ModuleLayoutHeaderContent>

        <ModuleLayoutHeaderActions>
          <Button variant="default" size="sm" className="gap-2" onClick={goToCreate}>
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </ModuleLayoutHeaderActions>
      </ModuleLayoutHeader>

      <Tabs
        value={tab}
        onValueChange={(next) => setTab(next as ProjectListTab)}
        className="@sm:p- flex-1 flex flex-col min-h-0"
      >
        <div className="border rounded-md flex-1 flex flex-col min-h-0">

         <ModuleLayoutToolbar>
          <TabsList variant="primary">
            {PROJECT_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="gap-2 px-4 font-poppins">
                <span>{t.label}</span>
                <span className="rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold text-foreground">
                  {counts[t.value]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <ModuleLayoutToolbarCenter>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search projects..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </ModuleLayoutToolbarCenter>

          <ModuleLayoutToolbarRight>
            <Button variant="outline" className="gap-2">
              <ListFilter className="w-4 h-4" />
              Show Filter
            </Button>
          </ModuleLayoutToolbarRight>
        </ModuleLayoutToolbar>

         <div className="flex-1 overflow-y-auto min-h-0 pb-4 px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <EmptyState
                  title="No projects found"
                  description="There are no projects for this status right now."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>

      </Tabs>
    </ModuleLayout>
  );
}
