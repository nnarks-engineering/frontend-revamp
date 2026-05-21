import { api } from "@/shared/lib/api-client";
import { COMPANY_ENDPOINTS, USER_ENDPOINTS } from "@/shared/lib/constants";
import type { Company } from "@/types/companies";
import type { ProfileRead } from "@/types/users";

export interface PersonalInfoPayload {
  firstName: string;
  lastName: string;
  otherNames?: string;
}

export interface VendorProfilePayload {
  companyName: string;
  description?: string;
}

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

export async function submitVendorProfile(
  data: VendorProfilePayload,
): Promise<Company> {
  const res = await api.post<Company>(COMPANY_ENDPOINTS.LIST, {
    name: data.companyName,
    description: data.description ?? null,
  });
  return res.data;
}

export async function skipVendorProfile(emailPrefix: string): Promise<Company> {
  const res = await api.post<Company>(COMPANY_ENDPOINTS.LIST, {
    name: emailPrefix,
  });
  return res.data;
}
