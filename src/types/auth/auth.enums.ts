// ── AuthTokenType ─────────────────────────────────────────────────────────────
export const AuthTokenType = {
  bearer: "bearer",
} as const;
export type AuthTokenType = (typeof AuthTokenType)[keyof typeof AuthTokenType];

// ── AuthFlow ──────────────────────────────────────────────────────────────────
// Used to distinguish between magic-link and password-based signup flows
export const AuthFlow = {
  magic: "magic",
  signup: "signup",
} as const;
export type AuthFlow = (typeof AuthFlow)[keyof typeof AuthFlow];
