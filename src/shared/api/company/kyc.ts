import { api } from "@/shared/lib/api-client";
import { KYC_ENDPOINTS } from "@/shared/lib/constants";
import type { Kyc, KycDocument, KycDocumentUpload } from "@/types/kyc/kyc.types";

export type { Kyc, KycDocument, KycDocumentUpload };


export async function getKyc(
    company_id: string,
    service_id?: string,
): Promise<Kyc> {
    const res = await api.get<Kyc>(KYC_ENDPOINTS.GET, {
        params: { company_id, ...(service_id && { service_id }) },
    });
    return res.data;
}

export async function uploadKycDocument(
    data: KycDocumentUpload,
): Promise<KycDocument> {
    const res = await api.post<KycDocument>(KYC_ENDPOINTS.DOCUMENTS, data);
    return res.data;
}

export async function listKycDocuments(
    company_id: string,
    service_id?: string,
): Promise<KycDocument[]> {
    const res = await api.get<KycDocument[]>(KYC_ENDPOINTS.DOCUMENTS, {
        params: { company_id, ...(service_id && { service_id }) },
    });
    return res.data;
}
