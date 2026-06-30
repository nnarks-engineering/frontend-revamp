import type { AuditActorType, AuditEventType } from "./audit.enums";

export interface LoginLockedMeta {
  kind: "login_locked";
  email: string;
}

export interface KYCSubmittedMeta {
  kind: "kyc_submitted";
  kyc_record_id: string;
  document_id: string;
  document_type: string;
}

export interface KYCReviewMeta {
  kind: "kyc_review";
  document_id: string;
  rejection_reason: string | null;
}

export interface KYCDocumentDownloadMeta {
  kind: "kyc_document_download";
  kyc_record_id: string;
  subject_user_id: string;
  doc_idx: number;
  object_key: string;
}

export interface ResourceMeta {
  kind: "resource";
  resource_type: string;
  resource_id: string;
}

export interface ConfigUpdateMeta {
  kind: "config_update";
  changed: Record<string, unknown>;
}

export interface CompanyMemberMeta {
  kind: "company_member";
  member_id: string;
  email: string | null;
  role: string | null;
}

export interface WalletDepositInitiatedMeta {
  kind: "wallet_deposit_initiated";
  wallet_id: string;
  order_id: string;
  amount: number;
  currency: string;
  provider: string;
  provider_reference: string;
}

export interface WalletDepositConfirmedMeta {
  kind: "wallet_deposit_confirmed";
  wallet_id: string;
  order_id: string;
  amount: number;
  currency: string;
}

export interface WalletTransferCompletedMeta {
  kind: "wallet_transfer_completed";
  from_wallet_id: string;
  to_wallet_id: string;
  amount: number;
  currency: string;
  reference: string;
}

export interface CompanyOwnershipTransferMeta {
  kind: "company_ownership_transfer";
  new_owner_user_id: string;
}

export interface CompanyTierChangedMeta {
  kind: "company_tier_changed";
  company_id: string;
  prior_tier_id: string | null;
  new_tier_id: string;
  stripe_subscription_id: string | null;
}

export interface StorageUrlIssuedMeta {
  kind: "storage_url_issued";
  category: string;
  key: string;
  action: "upload" | "download";
  ttl_s: number;
}

export interface PointsGrantMeta {
  kind: "points_grant";
  company_id: string;
  amount: number;
  note: string | null;
}

export interface PointsRevokeMeta {
  kind: "points_revoke";
  event_ids: string[];
  revoked_count: number;
  total_points_removed: number;
  revocation_reason: string;
}

export type AuditMeta =
  | LoginLockedMeta
  | KYCSubmittedMeta
  | KYCReviewMeta
  | KYCDocumentDownloadMeta
  | ResourceMeta
  | ConfigUpdateMeta
  | CompanyMemberMeta
  | CompanyOwnershipTransferMeta
  | CompanyTierChangedMeta
  | StorageUrlIssuedMeta
  | WalletDepositInitiatedMeta
  | WalletDepositConfirmedMeta
  | WalletTransferCompletedMeta
  | PointsGrantMeta
  | PointsRevokeMeta;

export interface AuditEventRead {
  id: string;
  actor_id: string | null;
  actor_type: AuditActorType;
  event_type: AuditEventType;
  ip_address: string | null;
  user_agent: string | null;
  resource_type: string | null;
  resource_id: string | null;
  meta: AuditMeta | null;
  idempotency_key: string | null;
  created_at: string;
}
