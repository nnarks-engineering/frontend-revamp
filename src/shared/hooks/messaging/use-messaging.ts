import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  type CreateSessionPayload,
  createSession,
  getSession,
  listMessages,
  listSessions,
  type SendMessagePayload,
  sendMessage,
} from "@/shared/api/messaging/messaging";
import type { SessionType } from "@/types";
import type { PageParams } from "@/types/common";

export const messagingKeys = {
  all: ["messaging"] as const,
  sessions: () => [...messagingKeys.all, "sessions"] as const,
  sessionList: (sessionType?: SessionType, params?: PageParams) =>
    [...messagingKeys.sessions(), { sessionType, params }] as const,
  sessionDetail: (id: string) => [...messagingKeys.sessions(), id] as const,
  messages: (sessionId: string) => [...messagingKeys.all, "messages", sessionId] as const,
};

export function useSessions(sessionType?: SessionType, params?: PageParams) {
  return useQuery({
    queryKey: messagingKeys.sessionList(sessionType, params),
    queryFn: () => listSessions(sessionType, params),
  });
}

export function useSession(id?: string) {
  return useQuery({
    queryKey: messagingKeys.sessionDetail(id as string),
    queryFn: () => getSession(id as string),
    enabled: !!id,
  });
}

export function useMessages(sessionId?: string, beforeId?: string, limit?: number) {
  return useQuery({
    queryKey: [...messagingKeys.messages(sessionId as string), { beforeId, limit }] as const,
    queryFn: () => listMessages(sessionId as string, beforeId, limit),
    enabled: !!sessionId,
    // Typically refetch interval is good for chat, but we can rely on manual refetch or invalidate for now
    refetchInterval: 5000,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSessionPayload) => createSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagingKeys.sessions() });
    },
  });
}

export function useSendMessage(sessionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessagePayload) => sendMessage(sessionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagingKeys.messages(sessionId) });
    },
  });
}
