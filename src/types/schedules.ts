/**
 * Schedule types — mirrors backend ScheduleOut, ScheduleRunOut, ScheduleRunEvent.
 */

export interface Cron {
  value: string;
  enabled: boolean;
  /** ISO datetime of the next scheduled run */
  next_run: string;
  /** Human-readable description of the cron expression */
  description: string;
}

export interface Schedule {
  id: string;
  name: string;
  description: string | null;
  task_name: string;
  cron: Cron;
  config: Record<string, unknown>;
  misfire_grace_time: number;
  created_at: string;
  updated_at: string;
  recent_run: ScheduleRun | null;
}

export type ScheduleOut = Schedule;

export interface ScheduleRun {
  id: string;
  schedule_id: string;
  status: string;
  started_at: string | null;
  finished_at: string | null;
  error: string | null;
}

export type ScheduleRunOut = ScheduleRun;

export interface ScheduleRunEvent {
  id: string;
  run_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}
