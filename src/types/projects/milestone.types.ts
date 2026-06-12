
// ── Payloads ─────────────────────────────────────────────────────────────────

import type { FileType } from "../shared.enums";

import type { ProjectMilestoneStatus } from "./project.enums";

export interface MilestoneCreatePayload {
  company_id: string;
  title: string;
  description: string;
  position: number;
  budget_amount: number;
  start_date: string;
  end_date: string;
  estimated_duration?: number | null;
}

export interface MilestoneUpdatePayload {
  title?: string | null;
  description?: string | null;
  status?: ProjectMilestoneStatus | null;
  budget_amount?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  estimated_duration?: number | null;
}

// ── Responses ────────────────────────────────────────────────────────────────

export interface MilestoneResponse {
  id: string;
  project_id: string;
  title: string;
  description: string;
  position: number;
  status: ProjectMilestoneStatus;
  budget_amount: string;
  start_date: string;
  end_date: string;
  estimated_duration: number | null;
  required_evidence_types: FileType[];
  created_by: string;
  created_by_company_id: string;
}
