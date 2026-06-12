import { api } from "@/shared/lib/api-client";
import { PROJECT_ENDPOINTS } from "@/shared/lib/constants";
import type {
  AIPlanTaskResponse,
  PageParams,
  PaginatedResponse,
} from "@/types/common";
import type {
  AcceptInvitationPayload,
  InviteMemberPayload,
  MilestoneCreatePayload,
  MilestoneUpdatePayload,
  MilestoneResponse,
  ProjectResponse,
  ProjectCreatePayload,
  ProjectDashboardResponse,
  ProjectUpdatePayload,
  EvidenceResponse,
  EvidenceSubmitPayload,
  ReviewResponse,
  ReviewSubmitPayload,
} from "@/types/projects";

export type { AIPlanTaskResponse, EvidenceResponse, EvidenceSubmitPayload, PageParams, PaginatedResponse };

export async function listProjects(
  params: PageParams = {},
): Promise<PaginatedResponse<ProjectResponse>> {
  const res = await api.get<PaginatedResponse<ProjectResponse>>(PROJECT_ENDPOINTS.LIST, {
    params: { page: params.page ?? 1, size: params.size ?? 30 },
  });
  return res.data;
}

export async function getProjectDashboard(id: string): Promise<ProjectDashboardResponse> {
  const res = await api.get<ProjectDashboardResponse>(PROJECT_ENDPOINTS.DETAIL(id));
  return res.data;
}

export async function createProject(data: ProjectCreatePayload): Promise<ProjectResponse> {

  const res = await api.post<ProjectResponse>(PROJECT_ENDPOINTS.LIST, data);
  return res.data;
}

export async function updateProject(
  id: string,
  data: ProjectUpdatePayload,
): Promise<ProjectResponse> {
  const res = await api.patch<ProjectResponse>(PROJECT_ENDPOINTS.DETAIL(id), data);
  return res.data;
}


export async function inviteMember(
  projectId: string,
  data: InviteMemberPayload,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.INVITE_MEMBER(projectId), data);
}

export async function acceptInvitation(
  data: AcceptInvitationPayload,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.ACCEPT_INVITATION, data);
}

// ── Milestones ────────────────────────────────────────────────────────

/** GET /projects/:id/milestones — list all milestones for a project */
export async function listMilestones(projectId: string): Promise<MilestoneResponse[]> {
  const res = await api.get<MilestoneResponse[]>(PROJECT_ENDPOINTS.MILESTONES(projectId));
  return res.data;
}

export async function createMilestone(
  projectId: string,
  data: MilestoneCreatePayload,
): Promise<MilestoneResponse> {
  const res = await api.post<MilestoneResponse>(
    PROJECT_ENDPOINTS.MILESTONES(projectId),
    data,
  );
  return res.data;
}

export async function updateMilestone(
  projectId: string,
  milestoneId: string,
  data: MilestoneUpdatePayload,
): Promise<MilestoneResponse> {
  const res = await api.patch<MilestoneResponse>(
    PROJECT_ENDPOINTS.MILESTONE_DETAIL(projectId, milestoneId),
    data,
  );
  return res.data;
}


export async function listMilestoneEvidence(
  projectId: string,
  milestoneId: string,
): Promise<EvidenceResponse[]> {
  const res = await api.get<EvidenceResponse[]>(
    PROJECT_ENDPOINTS.MILESTONE_EVIDENCE(projectId, milestoneId),
    { params: { _project_id: projectId } }
  );
  return res.data;
}

export async function submitMilestoneEvidence(
  projectId: string,
  milestoneId: string,
  data: EvidenceSubmitPayload,
): Promise<EvidenceResponse> {
  const res = await api.post<EvidenceResponse>(
    PROJECT_ENDPOINTS.MILESTONE_EVIDENCE(projectId, milestoneId),
    data,
    { params: { _project_id: projectId } }
  );
  return res.data;
}

export async function submitMilestoneReview(
  projectId: string,
  milestoneId: string,
  data: ReviewSubmitPayload,
): Promise<ReviewResponse> {
  const res = await api.post<ReviewResponse>(
    PROJECT_ENDPOINTS.MILESTONE_REVIEWS(projectId, milestoneId),
    data,
    { params: { _project_id: projectId } }
  );
  return res.data;
}

// ── AI Planner ────────────────────────────────────────────────────────

/** POST /projects/:id/ai-plan — trigger AI milestone generation (async task) */
export async function triggerAIPlan(projectId: string): Promise<AIPlanTaskResponse> {
  const res = await api.post<AIPlanTaskResponse>(PROJECT_ENDPOINTS.AI_PLAN(projectId));
  return res.data;
}
