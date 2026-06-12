export const KycTier = {
  none: "none",
  basic: "basic",
  standard: "standard",
  enhanced: "enhanced",
} as const;
export type KycTier = (typeof KycTier)[keyof typeof KycTier];

export const KycBadge = {
  none: "none",
  bronze: "bronze",
  silver: "silver",
  gold: "gold",
} as const;
export type KycBadge = (typeof KycBadge)[keyof typeof KycBadge];

export const KycDocumentType = {
  passport: "passport",
  drivers_license: "drivers_license",
  national_id: "national_id",
  utility_bill: "utility_bill",
  bank_statement: "bank_statement",
  certificate_of_incorporation: "certificate_of_incorporation",
  tax_id: "tax_id",
  business_license: "business_license",
} as const;
export type KycDocumentType = (typeof KycDocumentType)[keyof typeof KycDocumentType];

export const KycDocumentStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;
export type KycDocumentStatus = (typeof KycDocumentStatus)[keyof typeof KycDocumentStatus];
