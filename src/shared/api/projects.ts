/**
 * Projects API functions — thin wrappers around the Axios instance.
 *
 * Maps 1:1 to the backend `/projects/` router.
 * Every function returns the parsed response data, never the raw
 * AxiosResponse, so consumers stay decoupled from HTTP details.
 *
 * Usage:
 *   import { listProjects, getProjectDashboard } from "@/shared/api/projects";
 */

import { api } from "@/shared/lib/api-client";
import { PROJECT_ENDPOINTS } from "@/shared/lib/constants";
import type {
  AIPlanTaskResponse,
  EvidenceRead,
  EvidenceSubmit,
  PageParams,
  PaginatedResponse,
} from "@/types/common";
import type {
  InviteMemberPayload,
  Milestone,
  MilestoneCreatePayload,
  MilestoneUpdatePayload,
  Project,
  ProjectCreatePayload,
  ProjectDashboard,
  ProjectUpdatePayload,
} from "@/types/projects";

export type { AIPlanTaskResponse, EvidenceRead, EvidenceSubmit, PageParams, PaginatedResponse };

// ── Project CRUD ──────────────────────────────────────────────────────

/** GET /projects — paginated list of the current user's projects */
export async function listProjects(
  params: PageParams = {},
): Promise<PaginatedResponse<Project>> {
  const res = await api.get<PaginatedResponse<Project>>(PROJECT_ENDPOINTS.LIST, {
    params: { page: params.page ?? 1, size: params.size ?? 30 },
  });
  return res.data;
}

/** GET /projects/:id — full dashboard view (members + milestones + wallet) */
export async function getProjectDashboard(id: string): Promise<ProjectDashboard> {
  const res = await api.get<ProjectDashboard>(PROJECT_ENDPOINTS.DETAIL(id));
  return res.data;
}

/** POST /projects — create a new project */
export async function createProject(data: ProjectCreatePayload): Promise<Project> {
  const res = await api.post<Project>(PROJECT_ENDPOINTS.LIST, data);
  return res.data;
}

/** PATCH /projects/:id — update a project */
export async function updateProject(
  id: string,
  data: ProjectUpdatePayload,
): Promise<Project> {
  const res = await api.patch<Project>(PROJECT_ENDPOINTS.DETAIL(id), data);
  return res.data;
}

// ── Members ───────────────────────────────────────────────────────────

/** POST /projects/:id/members/invite — invite a member by email */
export async function inviteMember(
  projectId: string,
  data: InviteMemberPayload,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.INVITE_MEMBER(projectId), data);
}

/** POST /projects/invitations/accept — accept a project invitation */
export async function acceptInvitation(inviteToken: string): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.ACCEPT_INVITATION, {
    invite_token: inviteToken,
  });
}

// ── Milestones ────────────────────────────────────────────────────────

/** GET /projects/:id/milestones — list all milestones for a project */
export async function listMilestones(projectId: string): Promise<Milestone[]> {
  const res = await api.get<Milestone[]>(PROJECT_ENDPOINTS.MILESTONES(projectId));
  return res.data;
}

/** POST /projects/:id/milestones — create a milestone */
export async function createMilestone(
  projectId: string,
  data: MilestoneCreatePayload,
): Promise<Milestone> {
  const res = await api.post<Milestone>(
    PROJECT_ENDPOINTS.MILESTONES(projectId),
    data,
  );
  return res.data;
}

/** PATCH /projects/:projectId/milestones/:milestoneId — update a milestone */
export async function updateMilestone(
  projectId: string,
  milestoneId: string,
  data: MilestoneUpdatePayload,
): Promise<Milestone> {
  const res = await api.patch<Milestone>(
    PROJECT_ENDPOINTS.MILESTONE_DETAIL(projectId, milestoneId),
    data,
  );
  return res.data;
}

// ── Evidence ──────────────────────────────────────────────────────────

/** GET /projects/:projectId/milestones/:milestoneId/evidence */
export async function listMilestoneEvidence(
  projectId: string,
  milestoneId: string,
): Promise<EvidenceRead[]> {
  const res = await api.get<EvidenceRead[]>(
    PROJECT_ENDPOINTS.MILESTONE_EVIDENCE(projectId, milestoneId),
  );
  return res.data;
}

/** POST /projects/:projectId/milestones/:milestoneId/evidence */
export async function submitMilestoneEvidence(
  projectId: string,
  milestoneId: string,
  data: EvidenceSubmit,
): Promise<EvidenceRead> {
  const res = await api.post<EvidenceRead>(
    PROJECT_ENDPOINTS.MILESTONE_EVIDENCE(projectId, milestoneId),
    data,
  );
  return res.data;
}

// ── AI Planner ────────────────────────────────────────────────────────

/** POST /projects/:id/ai-plan — trigger AI milestone generation (async task) */
export async function triggerAIPlan(projectId: string): Promise<AIPlanTaskResponse> {
  const res = await api.post<AIPlanTaskResponse>(PROJECT_ENDPOINTS.AI_PLAN(projectId));
  return res.data;
}
