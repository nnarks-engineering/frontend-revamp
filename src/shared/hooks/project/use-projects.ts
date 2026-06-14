

import {
    type UseQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    acceptInvitation,
    createMilestone,
    createProject,
    getProjectDashboard,
    inviteMember,
    listMilestoneEvidence,
    listMilestones,
    listProjects,
    submitMilestoneEvidence,
    submitMilestoneReview,
    triggerAIPlan,
    updateMilestone,
    updateProject,
} from "@/shared/api/project/projects";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type {
    PageParams,
    PaginatedResponse,
} from "@/types/common";
import type {
    AcceptInvitationPayload,
    EvidenceResponse,
    EvidenceSubmitPayload,
    InviteMemberPayload,
    MilestoneCreatePayload,
    MilestoneResponse,
    MilestoneUpdatePayload,
    ProjectCreatePayload,
    ProjectDashboardResponse,
    ProjectResponse,
    ProjectUpdatePayload,
    ReviewResponse,
    ReviewSubmitPayload,
} from "@/types/projects";

// ═══════════════════════════════════════════════════════════════════
// Projects
// ═══════════════════════════════════════════════════════════════════

/** Paginated list of the current user's projects. */
export function useProjects(
    params: PageParams = {},
    options?: Omit<UseQueryOptions<PaginatedResponse<ProjectResponse>>, "queryKey" | "queryFn">,
) {
    return useQuery<PaginatedResponse<ProjectResponse>>({
        queryKey: [...QUERY_KEYS.projects, params],
        queryFn: () => listProjects(params),
        ...options,
    });
}

/** Full project dashboard — includes members, milestones, wallet. */
export function useProject(
    id: string,
    options?: Omit<UseQueryOptions<ProjectDashboardResponse>, "queryKey" | "queryFn">,
) {
    return useQuery<ProjectDashboardResponse>({
        queryKey: QUERY_KEYS.project(id),
        queryFn: () => getProjectDashboard(id),
        enabled: Boolean(id),
        ...options,
    });
}

/** Create a new project → invalidates the projects list. */
export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation<ProjectResponse, Error, ProjectCreatePayload>({
        mutationFn: (data) => createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
        },
        onError: (_e) => { }
    });
}

/** Update a project → invalidates both the list and the detail. */
export function useUpdateProject(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation<ProjectResponse, Error, ProjectUpdatePayload>({
        mutationFn: (data) => updateProject(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
        },
    });
}

// ═══════════════════════════════════════════════════════════════════
// Members
// ═══════════════════════════════════════════════════════════════════

/** Invite a member to a project by email. */
export function useInviteMember(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation<void, Error, InviteMemberPayload>({
        mutationFn: (data) => inviteMember(projectId, data),
        onSuccess: () => {
            // Refresh the dashboard so the new pending member appears
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
        },
    });
}

/** Accept a project invitation via token. */
export function useAcceptInvitation() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, AcceptInvitationPayload>({
        mutationFn: (payload) => acceptInvitation(payload),
        onSuccess: () => {
            // The user is now a project member — refresh the full list
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
        },
    });
}

// ═══════════════════════════════════════════════════════════════════
// Milestones
// ═══════════════════════════════════════════════════════════════════

/** List all milestones for a project. */
export function useMilestones(
    projectId: string,
    options?: Omit<UseQueryOptions<MilestoneResponse[]>, "queryKey" | "queryFn">,
) {
    return useQuery<MilestoneResponse[]>({
        queryKey: QUERY_KEYS.milestones(projectId),
        queryFn: () => listMilestones(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

/** Create a milestone → invalidates the milestone list and project dashboard. */
export function useCreateMilestone(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation<MilestoneResponse, Error, MilestoneCreatePayload>({
        mutationFn: (data) => createMilestone(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.milestones(projectId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
        },
    });
}

/** Update a milestone → invalidates the milestone list and project dashboard. */
export function useUpdateMilestone(projectId: string, milestoneId: string) {
    const queryClient = useQueryClient();

    return useMutation<MilestoneResponse, Error, MilestoneUpdatePayload>({
        mutationFn: (data) => updateMilestone(projectId, milestoneId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.milestones(projectId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
        },
    });
}

// ═══════════════════════════════════════════════════════════════════
// Evidence
// ═══════════════════════════════════════════════════════════════════

/** List evidence submitted for a milestone. */
export function useMilestoneEvidence(projectId: string, milestoneId: string) {
    return useQuery<EvidenceResponse[]>({
        queryKey: ["projects", projectId, "milestones", milestoneId, "evidence"],
        queryFn: () => listMilestoneEvidence(projectId, milestoneId),
        enabled: Boolean(projectId) && Boolean(milestoneId),
    });
}

/** Submit evidence for a milestone. */
export function useSubmitEvidence(projectId: string, milestoneId: string) {
    const queryClient = useQueryClient();

    return useMutation<EvidenceResponse, Error, EvidenceSubmitPayload>({
        mutationFn: (data) => submitMilestoneEvidence(projectId, milestoneId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", projectId, "milestones", milestoneId, "evidence"],
            });
        },
    });
}

/** Submit a review for a milestone. */
export function useSubmitMilestoneReview(projectId: string, milestoneId: string) {
    const queryClient = useQueryClient();

    return useMutation<ReviewResponse, Error, ReviewSubmitPayload>({
        mutationFn: (data) => submitMilestoneReview(projectId, milestoneId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", projectId, "milestones", milestoneId, "reviews"],
            });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.milestones(projectId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.project(projectId) });
        },
    });
}

// ═══════════════════════════════════════════════════════════════════
// AI Planner
// ═══════════════════════════════════════════════════════════════════

/**
 * Trigger the AI milestone planner for a project.
 * The backend enqueues an async task — the response contains a
 * `task_id` you can use to poll for completion.
 */
export function useTriggerAIPlan(projectId: string) {
    return useMutation({
        mutationFn: () => triggerAIPlan(projectId),
    });
}
