import { api } from "@/shared/lib/api-client";
import { SERVICE_ENDPOINTS } from "@/shared/lib/constants";
import type { PageParams, PaginatedResponse } from "@/types";
import type { Service, ServiceCreate, ServiceUpdate } from "@/types/service/service.types";

export type { Service, ServiceCreate, ServiceUpdate };

// ── CRUD ──────────────────────────────────────────────────────────────

/** POST /services — create a new service listing */
export async function createService(data: ServiceCreate): Promise<Service> {
    const res = await api.post<Service>(SERVICE_ENDPOINTS.LIST, data);
    return res.data;
}

export async function listServices(
    params?: PageParams & { company_id?: string; category?: string },
): Promise<PaginatedResponse<Service>> {
    const res = await api.get<PaginatedResponse<Service>>(SERVICE_ENDPOINTS.LIST, {
        params,
    });
    return res.data;
}

export async function getService(id: string): Promise<Service> {
    const res = await api.get<Service>(SERVICE_ENDPOINTS.DETAIL(id));
    return res.data;
}

export async function updateService(
    id: string,
    data: ServiceUpdate,
): Promise<Service> {
    const res = await api.patch<Service>(SERVICE_ENDPOINTS.DETAIL(id), data);
    return res.data;
}

export async function deleteService(id: string): Promise<void> {
    await api.delete(SERVICE_ENDPOINTS.DETAIL(id));
}
