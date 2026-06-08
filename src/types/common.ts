/**
 * Common API utility types shared across domains.
 */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PageParams {
  page?: number;
  size?: number;
}

export interface EvidenceRead {
  id: string;
  subject_type: string;
  subject_id: string;
  submitting_company_id: string;
  submitted_by_user_id: string;
  evidence_type: string;
  file_url: string;
  file_name: string;
  verified: boolean;
  verified_by_user_id: string | null;
  notes: string | null;
}

export interface EvidenceSubmit {
  company_id: string;
  evidence_type: string;
  file_name: string;
  file_url: string;
}

export interface AIPlanTaskResponse {
  task_id: string;
  thread_id: string;
}
