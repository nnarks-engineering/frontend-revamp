/**
 * KYC types — mirrors backend KycRead, KycDocumentRead schemas.
 */
import type { KycBadge, KycDocumentStatus, KycDocumentType, KycTier } from "./enums";

export interface Kyc {
    id: string;
    company_id: string;
    service_id: string | null;
    current_tier: KycTier;
    confidence_score: number;
    badge: KycBadge;
    created_at: string;
    updated_at: string;
}

export type KycRead = Kyc;

export interface KycDocument {
    id: string;
    kyc_id: string;
    document_type: KycDocumentType;
    file_url: string;
    status: KycDocumentStatus;
    verified_at: string | null;
    rejection_reason: string | null;
    updated_at: string;
}

export type KycDocumentRead = KycDocument;

export interface KycDocumentUpload {
    company_id: string;
    service_id?: string | null;
    document_type: KycDocumentType;
    file_url: string;
}
