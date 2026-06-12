/**
 * Enums — mirror backend StrEnum values exactly.
 * When integrating the API, these will come from the server verbatim.
 */

/* ── Companies ── */

export type CompanyRole = "owner" | "admin" | "member" | "viewer" | "agent";

export const CompanyMemberStatus = {
  pending: "pending",
  active: "active",
  removed: "removed",
  left: "left",
} as const;
export type CompanyMemberStatus = (typeof CompanyMemberStatus)[keyof typeof CompanyMemberStatus];

export type PartnershipTier = "none" | "verified" | "nnarks_partner";

export type CompanyPermission =
  | "company_edit_profile"
  | "company_delete"
  | "company_transfer_ownership"
  | "member_invite"
  | "member_remove"
  | "member_change_role"
  | "service_create"
  | "service_edit"
  | "service_delete"
  | "service_publish"
  | "project_create"
  | "escrow_accept"
  | "escrow_fulfill"
  | "escrow_dispute"
  | "kyc_submit"
  | "wallet_view"
  | "wallet_withdraw"
  | "proposal_propose"
  | "proposal_vote"
  | "agent_manage";

/* ── KYC ── */

export type KycTier = "none" | "basic" | "standard" | "enhanced";

export type KycBadge = "none" | "bronze" | "silver" | "gold";

export type KycDocumentType =
  | "passport"
  | "drivers_license"
  | "national_id"
  | "utility_bill"
  | "bank_statement"
  | "certificate_of_incorporation"
  | "tax_id"
  | "business_license";

export type KycDocumentStatus = "pending" | "approved" | "rejected";

/* ── Services ── */

export type ServiceStatus = "draft" | "published" | "archived";

/* ── Wallet ── */

export type Currency = "GHS" | "NGN" | "USD" | "GBP" | "EUR";

export type WalletOwnerType = "USER" | "PROJECT";

export type TxType = "DEPOSIT" | "LOCK" | "RELEASE" | "WITHDRAWAL" | "TRANSFER";

export type TxStatus = "PENDING" | "COMPLETED" | "FAILED";

export type WalletPaymentProvider = "SIMULATOR" | "FLUTTERWAVE" | "STRIPE";

/* ── Messaging ── */

export type SessionType = "DM" | "GROUP" | "PROJECT" | "AI_DM" | "PROPOSAL";

export type MemberType = "HUMAN" | "AI";

export type MessageRole = "HUMAN" | "AI" | "SYSTEM" | "TOOL";

export type DocumentFileType =
  | "PDF"
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "SPREADSHEET"
  | "WORD"
  | "TEXT";

/* ── Proposals ── */

export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

export type ProposalSubjectType = "PROJECT" | "MILESTONE";

export type ProposalAction = "ARCHIVE" | "SKIP";

export type VoteChoice = "APPROVED" | "REJECTED";

/* ── Notifications ── */

export type NotificationType = "system_announcement";

export type NotificationLevel = "info" | "warning" | "critical";

export type NotificationScope = "user" | "company";

export type NotificationSource = "system" | "user_action" | "integration";
