import { useQuery } from "@tanstack/react-query";

import { getAuditEvent, listAuditEvents } from "@/shared/api/audit/audit";
import type { AuditFilterParams } from "@/shared/api/audit/audit";
import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type { PageParams } from "@/types/common";

export function useAuditEvents(filters?: AuditFilterParams, pageParams?: PageParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.auditEvents, filters, pageParams],
    queryFn: () => listAuditEvents(filters, pageParams),
    enabled: isAuthenticated(),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useAuditEvent(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.auditEvent(id),
    queryFn: () => getAuditEvent(id),
    enabled: isAuthenticated() && Boolean(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
