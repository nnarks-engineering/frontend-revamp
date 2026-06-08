/**
 * Project types — mirrors backend ProjectRead / ProjectDashboardRead schemas.
 */
import type {
  EvidenceType,
  Industry,
  MemberRole,
  MemberStatus,
  MilestoneCreatedBy,
  MilestoneStatus,
  ProjectStatus,
  ProjectType,
} from "./enums";

/* ── MemberRead ── */
export interface ProjectMember {
  id: string;
  project_id: string;
  company_id: string | null;
  email: string;
  role: MemberRole;
  status: MemberStatus;
}

/* ── MilestoneRead ── */
export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  position: number;
  status: MilestoneStatus;
  budget_amount: number; // Decimal → number on the frontend
  start_date: string;    // ISO date string
  end_date: string;
  estimated_duration: number | null;
  required_evidence_types: EvidenceType[];
  created_by: MilestoneCreatedBy;
  created_by_company_id: string;
}

/* ── ProjectRead ── */
export interface Project {
  id: string;
  owner_company_id: string;
  title: string;
  description: string;
  industry: Industry;
  project_type: ProjectType;
  status: ProjectStatus;
  location_address: string;
  location_lat: number | null;
  location_lng: number | null;
  start_date: string;
  end_date: string;
  total_budget: number;
  currency: string;
  wallet_id: string | null;
  chat_session_id: string | null;
}

/* ── ProjectDashboardRead (extended with relations) ── */
export interface ProjectDashboard extends Project {
  members: ProjectMember[];
  milestones: Milestone[];
  wallet: WalletRead | null;
}

/* ── WalletRead (inlined from wallet schemas) ── */
export interface WalletRead {
  id: string;
  owner_id: string;
  owner_type: string;
  currency: string;
  available_balance: number;
  locked_balance: number;
}

/* ── Create / Update DTOs ── */

export interface ProjectCreatePayload {
  owner_company_id: string;
  title: string;
  description: string;
  industry: Industry;
  project_type: ProjectType;
  location_address: string;
  location_lat?: number | null;
  location_lng?: number | null;
  start_date: string;
  end_date: string;
  total_budget: number;
  currency?: string;
}

export interface ProjectUpdatePayload {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: string;
  end_date?: string;
}

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
  title?: string;
  description?: string;
  status?: MilestoneStatus;
  budget_amount?: number;
  start_date?: string;
  end_date?: string;
  estimated_duration?: number | null;
}

export interface InviteMemberPayload {
  email: string;
  role?: MemberRole;
}

export interface AcceptProjectInvitationPayload {
  invite_token: string;
  company_id: string;
}

export interface ReviewRead {
  id: string;
  subject_type: string;
  subject_id: string;
  reviewer_company_id: string;
  acted_by_user_id: string;
  reviewer_role: string;
  reviewer_type: string;
  stars: number;
  status: string;
  verified: boolean;
  comment: string | null;
  reviewed_at: string;
  ai_confidence_score: number | null;
}

export interface ReviewSubmitPayload {
  company_id: string;
  reviewer_role: string;
  status: string;
  comment?: string | null;
}
