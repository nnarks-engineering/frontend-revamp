// ── AuthFlow ──────────────────────────────────────────────────────────────────
// Used to distinguish between magic-link and password-based signup flows
export const AuthFlow = {
  magic: "magic",
  signup: "signup",
} as const;
export type AuthFlow = (typeof AuthFlow)[keyof typeof AuthFlow];
