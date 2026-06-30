export const BillingProvider = {
  paystack: "paystack",
  stripe: "stripe",
} as const;
export type BillingProvider = (typeof BillingProvider)[keyof typeof BillingProvider];

export const SubscriptionStatus = {
  active: "active",
  canceled: "canceled",
  past_due: "past_due",
  incomplete: "incomplete",
  trialing: "trialing",
} as const;
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
