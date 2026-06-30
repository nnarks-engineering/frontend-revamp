export const AuditActorType = {
  USER: "user",
  ADMIN: "admin",
  SYSTEM: "system",
} as const;
export type AuditActorType = (typeof AuditActorType)[keyof typeof AuditActorType];

export const AuditEventType = {
  USER_LOGIN_SUCCESS: "user_login_success",
  USER_LOGIN_FAILED: "user_login_failed",
  USER_LOGIN_LOCKED: "user_login_locked",
  USER_LOGOUT: "user_logout",
  USER_REGISTERED: "user_registered",
  USER_DELETED: "user_deleted",
  USER_TOKENS_REVOKED: "user_tokens_revoked",
  ADMIN_ACTION: "admin_action",
  KYC_SUBMITTED: "kyc_submitted",
  KYC_APPROVED: "kyc_approved",
  KYC_REJECTED: "kyc_rejected",
  KYC_DOCUMENT_DOWNLOADED: "kyc_document_downloaded",
  CONFIG_UPDATED: "config_updated",
  COMPANY_CREATED: "company_created",
  COMPANY_DELETED: "company_deleted",
  COMPANY_MEMBER_INVITED: "company_member_invited",
  COMPANY_MEMBER_ACCEPTED: "company_member_accepted",
  COMPANY_MEMBER_DECLINED: "company_member_declined",
  COMPANY_MEMBER_EXPIRED: "company_member_expired",
  COMPANY_MEMBER_REMOVED: "company_member_removed",
  COMPANY_OWNERSHIP_TRANSFERRED: "company_ownership_transferred",
  COMPANY_TIER_CHANGED: "company_tier_changed",
  WALLET_DEPOSIT_INITIATED: "wallet_deposit_initiated",
  WALLET_DEPOSIT_CONFIRMED: "wallet_deposit_confirmed",
  WALLET_TRANSFER_COMPLETED: "wallet_transfer_completed",
  STORAGE_UPLOAD_URL_ISSUED: "storage_upload_url_issued",
  STORAGE_DOWNLOAD_URL_ISSUED: "storage_download_url_issued",
  POINTS_GRANTED: "points_granted",
  POINTS_REVOKED: "points_revoked",
} as const;
export type AuditEventType = (typeof AuditEventType)[keyof typeof AuditEventType];
