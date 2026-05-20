/**
 * KYC API functions.
 *
 * Maps to the backend `/kyc/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { KYC_ENDPOINTS } from "@/shared/lib/constants";
import type { Kyc, KycDocument, KycDocumentUpload } from "@/types/kyc";

export type { Kyc, KycDocument, KycDocumentUpload };

// ── KYC ───────────────────────────────────────────────────────────────

/** GET /kyc?company_id=&service_id= — fetch KYC status for a company */
export async function getKyc(
  company_id: string,
  service_id?: string,
): Promise<Kyc> {
  const res = await api.get<Kyc>(KYC_ENDPOINTS.KYC, {
    params: { company_id, ...(service_id && { service_id }) },
  });
  return res.data;
}

/** POST /kyc/documents — upload a KYC document */
export async function uploadKycDocument(
  data: KycDocumentUpload,
): Promise<KycDocument> {
  const res = await api.post<KycDocument>(KYC_ENDPOINTS.DOCUMENTS, data);
  return res.data;
}

/** GET /kyc/documents?company_id=&service_id= — list KYC documents */
export async function listKycDocuments(
  company_id: string,
  service_id?: string,
): Promise<KycDocument[]> {
  const res = await api.get<KycDocument[]>(KYC_ENDPOINTS.DOCUMENTS, {
    params: { company_id, ...(service_id && { service_id }) },
  });
  return res.data;
}
