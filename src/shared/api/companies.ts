/**
 * Companies API functions.
 *
 * Maps to the backend `/companies/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { COMPANY_ENDPOINTS } from "@/shared/lib/constants";
import type {
  AgentConfigRead,
  AgentConfigUpdate,
  AgentUserCreate,
  AgentUserRead,
  Company,
  CompanyCreate,
  CompanyMember,
  CompanyMemberInvite,
  CompanyMemberUpdate,
  CompanyUpdate,
} from "@/types/companies";

export type {
  AgentConfigRead,
  AgentConfigUpdate,
  AgentUserCreate,
  AgentUserRead,
  Company,
  CompanyCreate,
  CompanyMember,
  CompanyMemberInvite,
  CompanyMemberUpdate,
  CompanyUpdate
};

// ── Company CRUD ──────────────────────────────────────────────────────

/** POST /companies — create a new company */
export async function createCompany(data: CompanyCreate): Promise<Company> {
  const res = await api.post<Company>(COMPANY_ENDPOINTS.LIST, data);
  return res.data;
}

/** GET /companies/me — list all companies for the current user */
export async function listMyCompanies(): Promise<Company[]> {
  const res = await api.get<Company[]>(COMPANY_ENDPOINTS.MY_COMPANIES);
  return res.data;
}

/** GET /companies/:id */
export async function getCompany(id: string): Promise<Company> {
  const res = await api.get<Company>(COMPANY_ENDPOINTS.DETAIL(id));
  return res.data;
}

/** PATCH /companies/:id */
export async function updateCompany(
  id: string,
  data: CompanyUpdate,
): Promise<Company> {
  const res = await api.patch<Company>(COMPANY_ENDPOINTS.DETAIL(id), data);
  return res.data;
}

/** DELETE /companies/:id — 204 no content */
export async function deleteCompany(id: string): Promise<void> {
  await api.delete(COMPANY_ENDPOINTS.DETAIL(id));
}

// ── Invitations ───────────────────────────────────────────────────────

/** POST /companies/invitations/accept — accept a company membership invite */
export async function acceptCompanyInvitation(
  invite_token: string,
): Promise<CompanyMember> {
  const res = await api.post<CompanyMember>(COMPANY_ENDPOINTS.ACCEPT_INVITATION, {
    invite_token,
  });
  return res.data;
}

// ── Members ───────────────────────────────────────────────────────────

/** POST /companies/:id/members — invite a member by email */
export async function inviteCompanyMember(
  id: string,
  data: CompanyMemberInvite,
): Promise<CompanyMember> {
  const res = await api.post<CompanyMember>(COMPANY_ENDPOINTS.MEMBERS(id), data);
  return res.data;
}

/** GET /companies/:id/members */
export async function listCompanyMembers(id: string): Promise<CompanyMember[]> {
  const res = await api.get<CompanyMember[]>(COMPANY_ENDPOINTS.MEMBERS(id));
  return res.data;
}

/** PATCH /companies/:id/members/:memberId */
export async function updateCompanyMember(
  id: string,
  memberId: string,
  data: CompanyMemberUpdate,
): Promise<CompanyMember> {
  const res = await api.patch<CompanyMember>(
    COMPANY_ENDPOINTS.MEMBER_DETAIL(id, memberId),
    data,
  );
  return res.data;
}

/** DELETE /companies/:id/members/:memberId — 204 no content */
export async function removeCompanyMember(
  id: string,
  memberId: string,
): Promise<void> {
  await api.delete(COMPANY_ENDPOINTS.MEMBER_DETAIL(id, memberId));
}

/** POST /companies/:id/transfer-ownership */
export async function transferOwnership(
  id: string,
  new_owner_user_id: string,
): Promise<void> {
  await api.post(COMPANY_ENDPOINTS.TRANSFER_OWNERSHIP(id), { new_owner_user_id });
}

// ── Agent management ──────────────────────────────────────────────────

/** POST /companies/:id/agent — create an AI agent user for the company */
export async function createCompanyAgent(
  id: string,
  data: AgentUserCreate,
): Promise<AgentUserRead> {
  const res = await api.post<AgentUserRead>(COMPANY_ENDPOINTS.AGENT(id), data);
  return res.data;
}

/** PATCH /companies/:id/agent/config — update the company's agent config */
export async function updateCompanyAgentConfig(
  id: string,
  data: AgentConfigUpdate,
): Promise<AgentConfigRead> {
  const res = await api.patch<AgentConfigRead>(
    COMPANY_ENDPOINTS.AGENT_CONFIG(id),
    data,
  );
  return res.data;
}
