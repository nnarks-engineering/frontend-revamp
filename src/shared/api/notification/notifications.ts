import { api } from "@/shared/lib/api-client";
import { NOTIFICATION_ENDPOINTS } from "@/shared/lib/constants";
import type { NotificationLevel, NotificationType, PageParams, PaginatedResponse } from "@/types";
import type {
    Notification,
    UnreadCountRead,
} from "@/types/notification/notification.types";

export type { Notification, UnreadCountRead };

interface NotificationListParams extends PageParams {
    read?: boolean;
    dismissed?: boolean;
    type?: NotificationType;
    level?: NotificationLevel;
}


export async function listNotifications(
    params?: NotificationListParams,
): Promise<PaginatedResponse<Notification>> {
    const res = await api.get<PaginatedResponse<Notification>>(
        NOTIFICATION_ENDPOINTS.LIST,
        { params },
    );
    return res.data;
}

export async function getUnreadCount(): Promise<UnreadCountRead> {
    const res = await api.get<UnreadCountRead>(NOTIFICATION_ENDPOINTS.UNREAD_COUNT);
    return res.data;
}

export async function markOneRead(id: string): Promise<void> {
    await api.patch(NOTIFICATION_ENDPOINTS.MARK_ONE_READ(id));
}

export async function markBulkRead(ids: string[]): Promise<void> {
    await api.post(NOTIFICATION_ENDPOINTS.MARK_READ, { ids });
}

export async function dismissOne(id: string): Promise<void> {
    await api.patch(NOTIFICATION_ENDPOINTS.DISMISS_ONE(id));
}

export async function dismissBulk(ids: string[]): Promise<void> {
    await api.post(NOTIFICATION_ENDPOINTS.DISMISS_BULK, { ids });
}
