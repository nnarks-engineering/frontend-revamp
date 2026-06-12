export const DocumentCategory = {
  ALL: "ALL",
  CONTRACT: "CONTRACT",
  PAY_SLIP: "PAY_SLIP",
  EMPLOYMENT_LETTER: "EMPLOYMENT_LETTER",
  REPORT: "REPORT",
  INVOICE: "INVOICE",
  OTHER: "OTHER",
} as const;
export type DocumentCategory = (typeof DocumentCategory)[keyof typeof DocumentCategory];
