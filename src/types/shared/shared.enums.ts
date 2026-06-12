// ── Currency ─────────────────────────────────────────────────────────────────
export const Currency = {
  ghs: "ghs",
  ngn: "ngn",
  usd: "usd",
  gbp: "gbp",
  eur: "eur",
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];


export const DocumentFileType = {
  image: "image",
  video: "video",
  document: "document",
  audio: "audio",
  pdf: "pdf",
  spreadsheet: "spreadsheet",
  word: "word",
  text: "text",
} as const;
export type DocumentFileType = (typeof DocumentFileType)[keyof typeof DocumentFileType];

// ── DurationUnit ─────────────────────────────────────────────────────────────
export const DurationUnit = {
  days: "days",
  weeks: "weeks",
  months: "months",
  years: "years",
} as const;
export type DurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];

// ── UserType ─────────────────────────────────────────────────────────────────
export const UserType = {
  client: "client",
  vendor: "vendor",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

// ── FilterCategory ───────────────────────────────────────────────────────────
export const FilterCategory = {
  all: "ALL",
} as const;
export type FilterCategory = (typeof FilterCategory)[keyof typeof FilterCategory];
