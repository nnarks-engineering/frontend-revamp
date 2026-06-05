import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectListTab } from "@/types/project-list";
import { PROJECT_TABS } from "./constants";

interface ProjectsStatusTabsProps {
  value: ProjectListTab;
  onChange: (value: ProjectListTab) => void;
  counts: Record<ProjectListTab, number>;
}

export function ProjectsStatusTabs({ value, onChange, counts }: Readonly<ProjectsStatusTabsProps>) {
  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as ProjectListTab)}>
      <TabsList variant="tertiary" className="h-10">
        {PROJECT_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-2 px-4">
            <span>{tab.label}</span>
            <span className="rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold text-foreground">
              {counts[tab.value]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
