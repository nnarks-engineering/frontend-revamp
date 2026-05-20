/**
 * Notifications API functions.
 *
 * Maps to the backend `/notifications/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { NOTIFICATION_ENDPOINTS } from "@/shared/lib/constants";
import type { PageParams, PaginatedResponse } from "@/types/common";
import type { NotificationLevel, NotificationType } from "@/types/enums";
import type {
    Notification,
    UnreadCountRead,
} from "@/types/notifications";

export type { Notification, UnreadCountRead };

interface NotificationListParams extends PageParams {
    read?: boolean;
    dismissed?: boolean;
    type?: NotificationType;
    level?: NotificationLevel;
}

// ── Notifications ─────────────────────────────────────────────────────

/** GET /notifications */
export async function listNotifications(
    params?: NotificationListParams,
): Promise<PaginatedResponse<Notification>> {
    const res = await api.get<PaginatedResponse<Notification>>(
        NOTIFICATION_ENDPOINTS.LIST,
        { params },
    );
    return res.data;
}

/** GET /notifications/unread-count */
export async function getUnreadCount(): Promise<UnreadCountRead> {
    const res = await api.get<UnreadCountRead>(NOTIFICATION_ENDPOINTS.UNREAD_COUNT);
    return res.data;
}

/** PATCH /notifications/:id/read — mark a single notification read (204) */
export async function markOneRead(id: string): Promise<void> {
    await api.patch(NOTIFICATION_ENDPOINTS.MARK_READ(id));
}

/** POST /notifications/read — bulk mark notifications read (204) */
export async function markBulkRead(ids: string[]): Promise<void> {
    await api.post(NOTIFICATION_ENDPOINTS.BULK_READ, { ids });
}

/** PATCH /notifications/:id/dismiss — dismiss a single notification (204) */
export async function dismissOne(id: string): Promise<void> {
    await api.patch(NOTIFICATION_ENDPOINTS.DISMISS(id));
}

/** POST /notifications/dismiss — bulk dismiss notifications (204) */
export async function dismissBulk(ids: string[]): Promise<void> {
    await api.post(NOTIFICATION_ENDPOINTS.BULK_DISMISS, { ids });
}
