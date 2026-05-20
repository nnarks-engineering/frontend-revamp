/**
 * Notification types — mirrors backend NotificationRead, UnreadCountRead.
 */
import type {
  NotificationType,
  NotificationLevel,
  NotificationScope,
  NotificationSource,
} from "./enums";

export interface Notification {
  id: string;
  recipient_user_id: string;
  type: NotificationType;
  scope_type: NotificationScope;
  scope_company_id: string | null;
  level: NotificationLevel;
  source: NotificationSource;
  actor_company_id: string | null;
  title: string;
  body: string;
  action_url: string | null;
  read_at: string | null;
  dismissed_at: string | null;
  created_at: string;
  updated_at: string;
  meta: Record<string, unknown>;
}

export type NotificationRead = Notification;

export interface UnreadCountRead {
  count: number;
}

export interface BulkIdsRequest {
  ids: string[];
}
