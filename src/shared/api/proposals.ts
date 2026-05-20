/**
 * Proposals API functions.
 *
 * Maps to the backend `/proposals/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { PROPOSAL_ENDPOINTS } from "@/shared/lib/constants";
import type {
  ProposalAction,
  ProposalStatus,
  ProposalSubjectType,
  VoteChoice,
} from "@/types/enums";
import type { Proposal, ProposalVote } from "@/types/proposals";

export type { Proposal, ProposalVote };

interface CreateProposalPayload {
  subject_type: ProposalSubjectType;
  subject_id: string;
  action: ProposalAction;
  note?: string | null;
  expires_at?: string | null;
}

// ── Proposals ─────────────────────────────────────────────────────────

/** POST /proposals — submit a new proposal */
export async function createProposal(
  data: CreateProposalPayload,
): Promise<Proposal> {
  const res = await api.post<Proposal>(PROPOSAL_ENDPOINTS.LIST, data);
  return res.data;
}

/** GET /proposals — list proposals with optional filters */
export async function listProposals(
  subject_type?: ProposalSubjectType,
  subject_id?: string,
  status?: ProposalStatus,
): Promise<Proposal[]> {
  const res = await api.get<Proposal[]>(PROPOSAL_ENDPOINTS.LIST, {
    params: {
      ...(subject_type && { subject_type }),
      ...(subject_id && { subject_id }),
      ...(status && { status }),
    },
  });
  return res.data;
}

/** GET /proposals/:id */
export async function getProposal(id: string): Promise<Proposal> {
  const res = await api.get<Proposal>(PROPOSAL_ENDPOINTS.DETAIL(id));
  return res.data;
}

/** GET /proposals/:id/votes/history?company_id= */
export async function getVoteHistory(
  proposalId: string,
  company_id: string,
): Promise<ProposalVote[]> {
  const res = await api.get<ProposalVote[]>(
    PROPOSAL_ENDPOINTS.VOTE_HISTORY(proposalId),
    { params: { company_id } },
  );
  return res.data;
}

/** POST /proposals/:id/votes — cast or update a vote */
export async function castVote(
  proposalId: string,
  company_id: string,
  vote: VoteChoice,
): Promise<Proposal> {
  const res = await api.post<Proposal>(PROPOSAL_ENDPOINTS.VOTES(proposalId), {
    company_id,
    vote,
  });
  return res.data;
}
