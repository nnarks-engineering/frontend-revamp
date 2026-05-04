/**
 * Enums — mirror backend StrEnum values exactly.
 * When integrating the API, these will come from the server verbatim.
 */

/* ── Projects ── */

export type Industry =
  | "AGRICULTURE"
  | "CONSTRUCTION"
  | "TECHNOLOGY"
  | "HEALTHCARE"
  | "EDUCATION"
  | "MANUFACTURING"
  | "RETAIL"
  | "OTHER";

export type ProjectType = "INDIVIDUAL" | "PARTNERED";

export type ProjectStatus =
  | "DRAFT"
  | "PRE_PROJECT"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "ARCHIVED";

export type MemberRole = "OWNER" | "PARTNER" | "SUPERVISOR";

export type MemberStatus = "PENDING" | "ACTIVE" | "REMOVED";

export type MilestoneStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "FAILED"
  | "SKIPPED";

export type MilestoneCreatedBy = "USER" | "AI";

export type EvidenceType = "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO";

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
