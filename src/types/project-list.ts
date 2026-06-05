import type { ProjectStatus } from "@/types/enums";

export type ProjectListTab = "active" | "pending" | "completed";

export interface ProjectTabConfig {
  value: ProjectListTab;
  label: string;
  statuses: readonly ProjectStatus[];
}
