/**
 * Services API functions.
 *
 * Maps to the backend `/services/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { SERVICE_ENDPOINTS } from "@/shared/lib/constants";
import type { PaginatedResponse, PageParams } from "@/types/common";
import type { Service, ServiceCreate, ServiceUpdate } from "@/types/services";

export type { Service, ServiceCreate, ServiceUpdate };

// ── CRUD ──────────────────────────────────────────────────────────────

/** POST /services — create a new service listing */
export async function createService(data: ServiceCreate): Promise<Service> {
  const res = await api.post<Service>(SERVICE_ENDPOINTS.LIST, data);
  return res.data;
}

/** GET /services — list/search services */
export async function listServices(
  params?: PageParams & { company_id?: string; category?: string },
): Promise<PaginatedResponse<Service>> {
  const res = await api.get<PaginatedResponse<Service>>(SERVICE_ENDPOINTS.LIST, {
    params,
  });
  return res.data;
}

/** GET /services/:id */
export async function getService(id: string): Promise<Service> {
  const res = await api.get<Service>(SERVICE_ENDPOINTS.DETAIL(id));
  return res.data;
}

/** PATCH /services/:id */
export async function updateService(
  id: string,
  data: ServiceUpdate,
): Promise<Service> {
  const res = await api.patch<Service>(SERVICE_ENDPOINTS.DETAIL(id), data);
  return res.data;
}

/** DELETE /services/:id — 204 no content */
export async function deleteService(id: string): Promise<void> {
  await api.delete(SERVICE_ENDPOINTS.DETAIL(id));
}
