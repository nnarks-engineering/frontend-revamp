import type { ProjectTabConfig } from "@/types/project-list";

export const PROJECTS_PAGE_SIZE = 100;

export const PROJECT_TABS: readonly ProjectTabConfig[] = [
    { value: "active", label: "Active Projects", statuses: ["active", "paused"] },
    { value: "pending", label: "Pending", statuses: ["draft", "pre_project"] },
    { value: "completed", label: "Completed", statuses: ["completed", "archived"] },
] as const;

export const CREATE_PROJECT_ROUTE = "/projects/create";
