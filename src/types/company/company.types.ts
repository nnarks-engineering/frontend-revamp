/**
 * Company types — mirrors backend CompanyRead, CompanyMemberRead, and agent schemas.
 */
import type { KycTier } from "../kyc";
import type { SessionType } from "../messaging";

import type {
    CompanyMemberStatus,
    CompanyPermission,
    CompanyRole,
    PartnershipTier,
} from "./company.enums";

/* ── CompanyRead ── */
export interface Company {
    id: string;
    name: string | null;
    slug: string;
    description: string | null;
    website_url: string | null;
    avatar_url: string | null;
    display_name: string | null;
    headline: string | null;
    kyc_tier: KycTier;
    partnership_tier: PartnershipTier;
    created_by_user_id: string;
    is_personal: boolean;
    created_at: string;
    updated_at: string;
}

export type CompanyRead = Company;

/* ── Create / Update DTOs ── */
export interface CompanyCreate {
    name?: string | null;
    description?: string | null;
    website_url?: string | null;
    avatar_url?: string | null;
    display_name?: string | null;
    headline?: string | null;
}

export interface CompanyUpdate {
    name?: string | null;
    description?: string | null;
    website_url?: string | null;
    avatar_url?: string | null;
    display_name?: string | null;
    headline?: string | null;
}

/* ── CompanyMemberRead ── */
export interface CompanyMember {
    id: string;
    company_id: string;
    user_id: string | null;
    email: string;
    role: CompanyRole;
    permissions: CompanyPermission[];
    status: CompanyMemberStatus;
    invite_token: string | null;
    invited_at: string;
    invite_expires_at: string | null;
    joined_at: string | null;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
}

export type CompanyMemberRead = CompanyMember;

export interface CompanyInvitationRead {
    id: string;
    company_id: string;
    company_name: string | null;
    company_avatar_url: string | null;
    role: CompanyRole;
    email: string;
    invite_token?: string;
    invited_at: string;
}

/* ── Member invite / update DTOs ── */
export interface CompanyMemberInvite {
    email: string;
    role?: CompanyRole;
}

export interface CompanyMemberUpdate {
    role?: CompanyRole | null;
    permissions?: CompanyPermission[] | null;
}

/* ── Agent schemas ── */
export interface ToolOverride {
    tool: string;
    session_type: SessionType;
    action: "allow" | "deny";
}

export interface AgentConfigRead {
    id: string;
    user_id: string;
    extra_instructions: string | null;
    temperature: number | null;
    llm_model: {
        value: string;
        label: string;
        status: string;
    } | null;
    tool_overrides: ToolOverride[];
    is_active: boolean;
}

export interface AgentConfigUpdate {
    extra_instructions?: string | null;
    temperature?: number | null;
    llm_model_value?: string | null;
    tool_overrides?: ToolOverride[] | null;
    is_active?: boolean | null;
}

export interface AgentUserCreate {
    name: string;
    email: string;
    llm_model_value?: string | null;
}

export interface AgentUserRead {
    id: string;
    email: string;
    is_llm: boolean;
    agent_config: AgentConfigRead;
}
