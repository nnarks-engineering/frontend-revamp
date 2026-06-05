import { useMemo } from "react";
import type { Project } from "@/types/projects";
import type { ProjectListTab } from "@/types/project-list";
import { PROJECT_TABS } from "../constants";

export function useProjectTabFilter(projects: readonly Project[], tab: ProjectListTab) {
    return useMemo(() => {
        const config = PROJECT_TABS.find((item) => item.value === tab);
        if (!config) return [] as Project[];
        return projects.filter((project) => config.statuses.includes(project.status));
    }, [projects, tab]);
}

export function useProjectTabCounts(projects: readonly Project[]) {
    return useMemo(() => {
        return PROJECT_TABS.reduce<Record<ProjectListTab, number>>((acc, config) => {
            acc[config.value] = projects.filter((project) => config.statuses.includes(project.status)).length;
            return acc;
        }, { active: 0, pending: 0, completed: 0 });
    }, [projects]);
}
