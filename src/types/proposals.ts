/**
 * Proposal types — mirrors backend ProposalRead, ProposalVoteRead schemas.
 */
import type {
  ProposalStatus,
  ProposalSubjectType,
  ProposalAction,
  VoteChoice,
} from "./enums";

export interface Proposal {
  id: string;
  subject_type: ProposalSubjectType;
  subject_id: string;
  action: ProposalAction;
  proposed_by: string;
  status: ProposalStatus;
  note: string | null;
  expires_at: string; // ISO datetime
  chat_session_id: string | null;
  votes: ProposalVote[];
}

export interface ProposalVote {
  id: string;
  proposal_id: string;
  voter_id: string;
  vote: VoteChoice | null;
  voted_at: string | null;
}
