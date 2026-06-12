// ── Currency ─────────────────────────────────────────────────────────────────
export const Currency = {
  ghs: "ghs",
  ngn: "ngn",
  usd: "usd",
  gbp: "gbp",
  eur: "eur",
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];


export const FileType = {
  image: "image",
  video: "video",
  document: "document",
  audio: "audio",
} as const;
export type FileType = (typeof FileType)[keyof typeof FileType];

// ── DurationUnit ─────────────────────────────────────────────────────────────
export const DurationUnit = {
  days: "days",
  weeks: "weeks",
  months: "months",
  years: "years",
} as const;
export type DurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];
