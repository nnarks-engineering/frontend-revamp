import type { FileType } from "../shared.enums";

import type { ProjectReviewStatus, ProjectReviewerType } from "./project.enums";

// ── Payloads ─────────────────────────────────────────────────────────────────

export interface EvidenceSubmitPayload {
  company_id: string;
  evidence_type: FileType;
  file_url: string;
  file_name: string;
}

export interface ReviewSubmitPayload {
  company_id: string;
  reviewer_role: string;
  status: ProjectReviewStatus;
  comment?: string | null;
}

// ── Responses ────────────────────────────────────────────────────────────────

export interface EvidenceResponse {
  id: string;
  subject_type: string;
  subject_id: string;
  submitting_company_id: string;
  submitted_by_user_id: string;
  evidence_type: FileType;
  file_url: string;
  file_name: string;
  verified: boolean;
  verified_by_user_id: string | null;
  notes: string | null;
}

export interface ReviewResponse {
  id: string;
  subject_type: string;
  subject_id: string;
  reviewer_company_id: string;
  acted_by_user_id: string;
  reviewer_role: string;
  reviewer_type: ProjectReviewerType;
  stars: number;
  status: ProjectReviewStatus;
  verified: boolean;
  comment: string | null;
  reviewed_at: string;
  ai_confidence_score: number | null;
}
