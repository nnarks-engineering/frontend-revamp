/**
 * Project-related TanStack Query hooks.
 *
 * These are the hooks components call — never import the API
 * functions directly from a component.
 *
 *   const { data }        = useProjects();
 *   const { data }        = useProject(projectId);
 *   const createMutation  = useCreateProject();
 *   const updateMutation  = useUpdateProject(projectId);
 *
 * Query keys come from `constants.ts` so all invalidations are
 * consistent across the app.
 */

import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseQueryOptions,
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
    triggerAIPlan,
    updateMilestone,
    updateProject,
} from "@/shared/api/projects";
import type {
    EvidenceRead,
    EvidenceSubmit,
    PageParams,
    PaginatedResponse,
} from "@/types/common";
import { QUERY_KEYS } from "@/shared/lib/constants";

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

// ═══════════════════════════════════════════════════════════════════
// Projects
// ═══════════════════════════════════════════════════════════════════

/** Paginated list of the current user's projects. */
export function useProjects(
    params: PageParams = {},
    options?: Omit<UseQueryOptions<PaginatedResponse<Project>>, "queryKey" | "queryFn">,
) {
    return useQuery<PaginatedResponse<Project>>({
        queryKey: [...QUERY_KEYS.projects, params],
        queryFn: () => listProjects(params),
        ...options,
    });
}

/** Full project dashboard — includes members, milestones, wallet. */
export function useProject(
    id: string,
    options?: Omit<UseQueryOptions<ProjectDashboard>, "queryKey" | "queryFn">,
) {
    return useQuery<ProjectDashboard>({
        queryKey: QUERY_KEYS.project(id),
        queryFn: () => getProjectDashboard(id),
        enabled: Boolean(id),
        ...options,
    });
}

/** Create a new project → invalidates the projects list. */
export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation<Project, Error, ProjectCreatePayload>({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
        },
    });
}

/** Update a project → invalidates both the list and the detail. */
export function useUpdateProject(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation<Project, Error, ProjectUpdatePayload>({
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

    return useMutation<void, Error, string>({
        mutationFn: (inviteToken) => acceptInvitation(inviteToken),
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
    options?: Omit<UseQueryOptions<Milestone[]>, "queryKey" | "queryFn">,
) {
    return useQuery<Milestone[]>({
        queryKey: QUERY_KEYS.milestones(projectId),
        queryFn: () => listMilestones(projectId),
        enabled: Boolean(projectId),
        ...options,
    });
}

/** Create a milestone → invalidates the milestone list and project dashboard. */
export function useCreateMilestone(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation<Milestone, Error, MilestoneCreatePayload>({
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

    return useMutation<Milestone, Error, MilestoneUpdatePayload>({
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
    return useQuery<EvidenceRead[]>({
        queryKey: ["projects", projectId, "milestones", milestoneId, "evidence"],
        queryFn: () => listMilestoneEvidence(projectId, milestoneId),
        enabled: Boolean(projectId) && Boolean(milestoneId),
    });
}

/** Submit evidence for a milestone. */
export function useSubmitEvidence(projectId: string, milestoneId: string) {
    const queryClient = useQueryClient();

    return useMutation<EvidenceRead, Error, EvidenceSubmit>({
        mutationFn: (data) => submitMilestoneEvidence(projectId, milestoneId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects", projectId, "milestones", milestoneId, "evidence"],
            });
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
