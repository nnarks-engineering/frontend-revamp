import { api } from "@/shared/lib/api-client";
import { USER_ENDPOINTS } from "@/shared/lib/constants";
import type { ProfileRead } from "@/types/users";

export interface VendorProfilePayload {
    companyName: string;
    description?: string;
}

/** PATCH /users/me/profile — persist vendor company name + bio. */
export async function submitVendorProfile(
    data: VendorProfilePayload,
): Promise<ProfileRead> {
    const res = await api.patch<ProfileRead>(USER_ENDPOINTS.MY_PROFILE, {
        display_name: data.companyName,
        bio: data.description ?? null,
    });
    return res.data;
}

/**
 * PATCH /users/me/profile — auto-create a minimal profile from the
 * user's email prefix when they choose to skip onboarding.
 */
export async function skipVendorProfile(
    emailPrefix: string,
): Promise<ProfileRead> {
    const res = await api.patch<ProfileRead>(USER_ENDPOINTS.MY_PROFILE, {
        display_name: emailPrefix,
    });
    return res.data;
}
