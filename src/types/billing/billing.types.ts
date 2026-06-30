import { BillingProvider, SubscriptionStatus } from "./billing.enums";

export interface CheckoutRequest {
    company_id: string;
    tier_id: string;
}

export interface CancelRequest {
    company_id: string;
}

export interface CheckoutSessionRead {
    checkout_url: string;
}

export interface SubscriptionRead {
    id: string;
    company_id: string;
    paystack_subscription_id: string;
    tier_id: string;
    status: SubscriptionStatus;
    provider: BillingProvider;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    created_at: string;
    updated_at: string;
}

export interface TierFeatures {
    business_company_max_count: number | null;
    company_member_max_count: number | null;
    project_max_count: number | null;
    service_max_count: number | null;
    agent_max_count: number | null;
    llm_tools_allowed: string[];
    llm_models_allowed: string[];
}

export interface TierRead {
    id: string;
    name: string;
    slug: string;
    paystack_plan_code: string | null;
    features: TierFeatures;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CompanyTierRead {
    id: string;
    company_id: string;
    tier_id: string;
    tier: TierRead;
    started_at: string;
    expires_at: string | null;
    paystack_subscription_id: string | null;
    created_at: string;
    updated_at: string;
}

