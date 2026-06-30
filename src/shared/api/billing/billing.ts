import { api } from "@/shared/lib/api-client";
import { BILLING_ENDPOINTS } from "@/shared/lib/constants";
import type { 
    CheckoutRequest, 
    CheckoutSessionRead, 
    CancelRequest, 
    SubscriptionRead,
    CompanyTierRead
} from "@/types/billing";

export async function createCheckoutSession(data: CheckoutRequest): Promise<CheckoutSessionRead> {
  const res = await api.post<CheckoutSessionRead>(BILLING_ENDPOINTS.CHECKOUT, data);
  return res.data;
}

export async function cancelSubscription(data: CancelRequest): Promise<CompanyTierRead> {
  const res = await api.post<CompanyTierRead>(BILLING_ENDPOINTS.CANCEL, data);
  return res.data;
}

export async function getSubscription(companyId: string): Promise<SubscriptionRead | null> {
  const res = await api.get<SubscriptionRead | null>(BILLING_ENDPOINTS.SUBSCRIPTION(companyId));
  return res.data;
}
