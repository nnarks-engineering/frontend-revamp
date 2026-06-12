import type { ProjectStatus } from "@/types/projects";

export type ProjectListTab = "active" | "pending" | "completed";

export interface ProjectTabConfig {
    value: ProjectListTab;
    label: string;
    statuses: readonly ProjectStatus[];
}
