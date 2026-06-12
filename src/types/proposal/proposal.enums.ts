export const ProposalStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
} as const;
export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];

export const ProposalSubjectType = {
  PROJECT: "PROJECT",
  MILESTONE: "MILESTONE",
} as const;
export type ProposalSubjectType = (typeof ProposalSubjectType)[keyof typeof ProposalSubjectType];

export const ProposalAction = {
  ARCHIVE: "ARCHIVE",
  SKIP: "SKIP",
} as const;
export type ProposalAction = (typeof ProposalAction)[keyof typeof ProposalAction];

export const VoteChoice = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type VoteChoice = (typeof VoteChoice)[keyof typeof VoteChoice];
