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
  submitted_by: string;
  evidence_type: string;
  file_url: string;
  description: string | null;
  created_at: string;
}

export interface EvidenceSubmit {
  evidence_type: string;
  file_url: string;
  description?: string;
}

export interface AIPlanTaskResponse {
  task_id: string;
  thread_id: string;
}
