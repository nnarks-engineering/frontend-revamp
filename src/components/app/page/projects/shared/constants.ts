import type { ProjectTabConfig } from "@/types/project-list";

export const PROJECTS_PAGE_SIZE = 100;

export const PROJECT_TABS: readonly ProjectTabConfig[] = [
  { value: "active", label: "Active Projects", statuses: ["ACTIVE", "PAUSED"] },
  { value: "pending", label: "Pending", statuses: ["DRAFT", "PRE_PROJECT"] },
  { value: "completed", label: "Completed", statuses: ["COMPLETED", "ARCHIVED"] },
] as const;

export const CREATE_PROJECT_ROUTE = "/projects/create";
