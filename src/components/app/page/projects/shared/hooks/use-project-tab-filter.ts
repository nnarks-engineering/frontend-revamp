import { useMemo } from "react";

import type { ProjectListTab } from "@/types/project-list";
import type { ProjectResponse } from "@/types/projects";

import { PROJECT_TABS } from "../constants";

export function useProjectTabFilter(projects: readonly ProjectResponse[], tab: ProjectListTab) {
    return useMemo(() => {
        const config = PROJECT_TABS.find((item) => item.value === tab);
        if (!config) return [] as ProjectResponse[];
        return projects.filter((project) =>
            config.statuses.includes(project.status as typeof config.statuses[number])
        );
    }, [projects, tab]);
}

export function useProjectTabCounts(projects: readonly ProjectResponse[]) {
    return useMemo(() => {
        return PROJECT_TABS.reduce<Record<ProjectListTab, number>>((acc, config) => {
            acc[config.value] = projects.filter((project) =>
                config.statuses.includes(project.status as typeof config.statuses[number])
            ).length;
            return acc;
        }, { active: 0, pending: 0, completed: 0 });
    }, [projects]);
}
