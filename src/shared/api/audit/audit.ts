import { api } from "@/shared/lib/api-client";
import { AUDIT_ENDPOINTS } from "@/shared/lib/constants";
import type { AuditEventType, AuditEventRead } from "@/types";
import type { PageParams, PaginatedResponse } from "@/types/common";

export interface AuditFilterParams {
  event_type?: AuditEventType;
  resource_type?: string;
  resource_id?: string;
  created_at__gte?: string;
  created_at__lte?: string;
}

export async function listAuditEvents(
  filters?: AuditFilterParams,
  pageParams?: PageParams,
): Promise<PaginatedResponse<AuditEventRead>> {
  const res = await api.get<PaginatedResponse<AuditEventRead>>(AUDIT_ENDPOINTS.LIST, {
    params: {
      ...filters,
      ...pageParams,
    },
  });
  return res.data;
}

export async function getAuditEvent(id: string): Promise<AuditEventRead> {
  const res = await api.get<AuditEventRead>(AUDIT_ENDPOINTS.DETAIL(id));
  return res.data;
}
