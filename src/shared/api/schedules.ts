import { api } from "@/shared/lib/api-client";
import { SCHEDULE_ENDPOINTS } from "@/shared/lib/constants";
import type { PageParams, PaginatedResponse } from "@/types/common";
import type { Schedule, ScheduleRun, ScheduleRunEvent } from "@/types/schedules";

export type { Schedule, ScheduleRun, ScheduleRunEvent };


export async function listSchedules(
    params?: PageParams,
): Promise<PaginatedResponse<Schedule>> {
    const res = await api.get<PaginatedResponse<Schedule>>(
        SCHEDULE_ENDPOINTS.LIST,
        { params },
    );
    return res.data;
}

export async function getSchedule(id: string): Promise<Schedule> {
    const res = await api.get<Schedule>(SCHEDULE_ENDPOINTS.DETAIL(id));
    return res.data;
}


export async function listScheduleRuns(
    id: string,
    params?: PageParams,
): Promise<PaginatedResponse<ScheduleRun>> {
    const res = await api.get<PaginatedResponse<ScheduleRun>>(
        SCHEDULE_ENDPOINTS.RUNS(id),
        { params },
    );
    return res.data;
}

export async function getScheduleRunEvents(
    runId: string,
    params?: PageParams,
): Promise<PaginatedResponse<ScheduleRunEvent>> {
    const res = await api.get<PaginatedResponse<ScheduleRunEvent>>(
        SCHEDULE_ENDPOINTS.RUN_EVENTS(runId),
        { params },
    );
    return res.data;
}
