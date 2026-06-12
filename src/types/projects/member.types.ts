import type { ProjectMemberRole, ProjectMemberStatus } from "./project.enums";

// ── Payloads ─────────────────────────────────────────────────────────────────

export interface InviteMemberPayload {
  email: string;
  role?: ProjectMemberRole;
}

export interface AcceptInvitationPayload {
  invite_token: string;
  company_id: string;
}

// ── Responses ────────────────────────────────────────────────────────────────

export interface MemberResponse {
  id: string;
  project_id: string;
  company_id: string;
  email: string;
  role: ProjectMemberRole;
  status: ProjectMemberStatus;
}
