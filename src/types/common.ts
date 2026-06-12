/**
 * Common API utility types shared across domains.
 */
import { type ReactNode, type ComponentType } from "react";

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

export interface AnnouncementItem {
  readonly id: number;
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly link: string;
}

export interface UserListItem {
  readonly id: string;
  readonly name: string;
  readonly handle?: string;
  readonly avatarUrl?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface RightPanelState {
  /**
   * Content registered by the current page.
   * `null` means "no page content" → AppLayout falls back to the AI Panel.
   */
  content: ReactNode;
  /** Icon shown on the collapsed FAB. Falls back to PanelRightOpen in the layout. */
  icon: ComponentType<{ className?: string }> | null;
  isOpen: boolean;
}

export interface RightPanelContextValue extends RightPanelState {
  setContent: (content: ReactNode, icon?: ComponentType<{ className?: string }>) => void;
  clearContent: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
