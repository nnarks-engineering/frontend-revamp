/**
 * Service types — mirrors backend ServiceRead schema.
 */
import type { ServiceStatus } from "./enums";

export interface Service {
    id: string;
    company_id: string;
    title: string;
    description: string;
    category: string | null;
    status: ServiceStatus;
    kyc_verified: boolean;
    created_at: string;
    updated_at: string;
}

export type ServiceRead = Service;

export interface ServiceCreate {
    company_id: string;
    title: string;
    description: string;
    category?: string | null;
}

export interface ServiceUpdate {
    title?: string | null;
    description?: string | null;
    category?: string | null;
    status?: ServiceStatus | null;
}
