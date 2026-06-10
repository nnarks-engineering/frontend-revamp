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
  AcceptProjectInvitationPayload,
  InviteMemberPayload,
  Milestone,
  MilestoneCreatePayload,
  MilestoneUpdatePayload,
  Project,
  ProjectCreatePayload,
  ProjectDashboard,
  ProjectUpdatePayload,
  ReviewRead,
  ReviewSubmitPayload,
} from "@/types/projects";

export type { AIPlanTaskResponse, EvidenceRead, EvidenceSubmit, PageParams, PaginatedResponse };

export async function listProjects(
  params: PageParams = {},
): Promise<PaginatedResponse<Project>> {
  const res = await api.get<PaginatedResponse<Project>>(PROJECT_ENDPOINTS.LIST, {
    params: { page: params.page ?? 1, size: params.size ?? 30 },
  });
  return res.data;
}

export async function getProjectDashboard(id: string): Promise<ProjectDashboard> {
  const res = await api.get<ProjectDashboard>(PROJECT_ENDPOINTS.DETAIL(id));
  return res.data;
}

export async function createProject(data: ProjectCreatePayload): Promise<Project> {
  console.log("Creating project with data:", data);
  const res = await api.post<Project>(PROJECT_ENDPOINTS.LIST, data);
  return res.data;
}

export async function updateProject(
  id: string,
  data: ProjectUpdatePayload,
): Promise<Project> {
  const res = await api.patch<Project>(PROJECT_ENDPOINTS.DETAIL(id), data);
  return res.data;
}


export async function inviteMember(
  projectId: string,
  data: InviteMemberPayload,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.INVITE_MEMBER(projectId), data);
}

export async function acceptInvitation(
  data: AcceptProjectInvitationPayload,
): Promise<void> {
  await api.post(PROJECT_ENDPOINTS.ACCEPT_INVITATION, data);
}

// ── Milestones ────────────────────────────────────────────────────────

/** GET /projects/:id/milestones — list all milestones for a project */
export async function listMilestones(projectId: string): Promise<Milestone[]> {
  const res = await api.get<Milestone[]>(PROJECT_ENDPOINTS.MILESTONES(projectId));
  return res.data;
}

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


export async function listMilestoneEvidence(
  projectId: string,
  milestoneId: string,
): Promise<EvidenceRead[]> {
  const res = await api.get<EvidenceRead[]>(
    PROJECT_ENDPOINTS.MILESTONE_EVIDENCE(projectId, milestoneId),
    { params: { _project_id: projectId } }
  );
  return res.data;
}

export async function submitMilestoneEvidence(
  projectId: string,
  milestoneId: string,
  data: EvidenceSubmit,
): Promise<EvidenceRead> {
  const res = await api.post<EvidenceRead>(
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
): Promise<ReviewRead> {
  const res = await api.post<ReviewRead>(
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
