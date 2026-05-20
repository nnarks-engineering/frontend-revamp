import { api } from "@/shared/lib/api-client";
import { COMPANY_ENDPOINTS, USER_ENDPOINTS } from "@/shared/lib/constants";
import type { Company } from "@/types/companies";
import type { ProfileRead } from "@/types/users";

// ── Payloads ──────────────────────────────────────────────────────────

export interface PersonalInfoPayload {
    firstName: string;
    lastName: string;
  otherNames?: string;
    companyName: string;
    description?: string;
}

// ── API calls ─────────────────────────────────────────────────────────

/** PATCH /users/me/profile — save the user's first & last name. */
export async function submitPersonalInfo(
    data: PersonalInfoPayload,
): Promise<ProfileRead> {
    const res = await api.patch<ProfileRead>(USER_ENDPOINTS.MY_PROFILE, {
        first_name: data.firstName,
        last_name: data.lastName,
        ...(data.otherNames !== undefined && { other_names: data.otherNames }),
    });
    return res.data;
}

/** POST /companies — create the vendor's company during onboarding. */
export async function submitVendorProfile(
    data: VendorProfilePayload,
): Promise<Company> {
    const res = await api.post<Company>(COMPANY_ENDPOINTS.LIST, {
        name: data.companyName,
        description: data.description ?? null,
    });
    return res.data;
}

/**
 * POST /companies — auto-create a minimal company from the user's email
 * prefix when they choose to skip the company-setup step.
 */
export async function skipVendorProfile(emailPrefix: string): Promise<Company> {
    const res = await api.post<Company>(COMPANY_ENDPOINTS.LIST, {
        name: emailPrefix,
    });
    return res.data;
}
