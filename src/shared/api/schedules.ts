/**
 * Schedules API functions.
 *
 * Maps to the backend `/schedules/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { SCHEDULE_ENDPOINTS } from "@/shared/lib/constants";
import type { PaginatedResponse, PageParams } from "@/types/common";
import type { Schedule, ScheduleRun, ScheduleRunEvent } from "@/types/schedules";

export type { Schedule, ScheduleRun, ScheduleRunEvent };

// ── Schedules ─────────────────────────────────────────────────────────

/** GET /schedules — list all schedules */
export async function listSchedules(
  params?: PageParams,
): Promise<PaginatedResponse<Schedule>> {
  const res = await api.get<PaginatedResponse<Schedule>>(
    SCHEDULE_ENDPOINTS.LIST,
    { params },
  );
  return res.data;
}

/** GET /schedules/:id */
export async function getSchedule(id: string): Promise<Schedule> {
  const res = await api.get<Schedule>(SCHEDULE_ENDPOINTS.DETAIL(id));
  return res.data;
}

// ── Schedule Runs ─────────────────────────────────────────────────────

/** GET /schedules/:id/runs — list runs for a schedule */
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

/** GET /schedules/run/:runId/events — list events for a run */
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
