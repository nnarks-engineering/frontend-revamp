import { api } from "@/shared/lib/api-client";
import { MESSAGING_ENDPOINTS } from "@/shared/lib/constants";
import type { PageParams, PaginatedResponse } from "@/types/common";
import type { SessionType } from "@/types/enums";
import type {
    ChatSession,
    CreateSessionPayload,
    Message,
    SendMessagePayload,
} from "@/types/messaging";

export type { ChatSession, CreateSessionPayload, Message, SendMessagePayload };


export async function createSession(
    data: CreateSessionPayload,
): Promise<ChatSession> {
    const res = await api.post<ChatSession>(MESSAGING_ENDPOINTS.LIST, data);
    return res.data;
}

export async function listSessions(
    session_type?: SessionType,
    params?: PageParams,
): Promise<PaginatedResponse<ChatSession>> {
    const res = await api.get<PaginatedResponse<ChatSession>>(
        MESSAGING_ENDPOINTS.LIST,
        { params: { ...(session_type && { session_type }), ...params } },
    );
    return res.data;
}

export async function getSession(id: string): Promise<ChatSession> {
    const res = await api.get<ChatSession>(MESSAGING_ENDPOINTS.DETAIL(id));
    return res.data;
}


export async function sendMessage(
    sessionId: string,
    data: SendMessagePayload,
): Promise<Message> {
    const res = await api.post<Message>(
        MESSAGING_ENDPOINTS.MESSAGES(sessionId),
        data,
    );
    return res.data;
}

export async function listMessages(
    sessionId: string,
    before_id?: string,
    limit?: number,
): Promise<Message[]> {
    const res = await api.get<Message[]>(MESSAGING_ENDPOINTS.MESSAGES(sessionId), {
        params: {
            ...(before_id && { before_id }),
            ...(limit && { limit }),
        },
    });
    return res.data;
}
