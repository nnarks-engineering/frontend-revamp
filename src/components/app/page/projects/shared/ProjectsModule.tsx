import { useState } from "react";
import { Plus, Search, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { ProjectsTable } from "./ProjectsTable";
import { PROJECT_TABS, PROJECTS_PAGE_SIZE, CREATE_PROJECT_ROUTE } from "./constants";
import { useProjects } from "@/shared/hooks/use-projects";
import { useProjectTabCounts, useProjectTabFilter } from "./hooks/use-project-tab-filter";
import type { ProjectListTab } from "@/types/project-list";
import { useNavigate } from "@tanstack/react-router";

export function ProjectsModule() {
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
    <ModuleLayout className="w-full">
      <ModuleLayoutHeader variant="primary">
        <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-primary/10 pointer-events-none" aria-hidden />
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

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

      <Tabs value={tab} onValueChange={(next) => setTab(next as ProjectListTab)} className="@sm:p-4 @md:p-6">
        <div className="border rounded-md">

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

        <div className="mt-4 pb-6">
          <ProjectsTable projects={filteredProjects} isLoading={isLoading} />
        </div>
        </div>

      </Tabs>
    </ModuleLayout>
  );
}
