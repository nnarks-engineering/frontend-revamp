export const CompanyRole = {
  owner: "owner",
  admin: "admin",
  member: "member",
  viewer: "viewer",
  agent: "agent",
} as const;
export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];

export const CompanyMemberStatus = {
  pending: "pending",
  active: "active",
  removed: "removed",
  left: "left",
} as const;
export type CompanyMemberStatus = (typeof CompanyMemberStatus)[keyof typeof CompanyMemberStatus];

export const PartnershipTier = {
  none: "none",
  verified: "verified",
  nnarks_partner: "nnarks_partner",
} as const;
export type PartnershipTier = (typeof PartnershipTier)[keyof typeof PartnershipTier];

export const CompanyPermission = {
  company_edit_profile: "company_edit_profile",
  company_delete: "company_delete",
  company_transfer_ownership: "company_transfer_ownership",
  member_invite: "member_invite",
  member_remove: "member_remove",
  member_change_role: "member_change_role",
  service_create: "service_create",
  service_edit: "service_edit",
  service_delete: "service_delete",
  service_publish: "service_publish",
  project_create: "project_create",
  escrow_accept: "escrow_accept",
  escrow_fulfill: "escrow_fulfill",
  escrow_dispute: "escrow_dispute",
  kyc_submit: "kyc_submit",
  wallet_view: "wallet_view",
  wallet_withdraw: "wallet_withdraw",
  proposal_propose: "proposal_propose",
  proposal_vote: "proposal_vote",
  agent_manage: "agent_manage",
} as const;
export type CompanyPermission = (typeof CompanyPermission)[keyof typeof CompanyPermission];
