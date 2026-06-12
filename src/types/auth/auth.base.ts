import type { AuthTokenType } from "./auth.enums";

// ── AuthTokenResponse ─────────────────────────────────────────────────────────
// Base shape returned by every endpoint that issues tokens:
// login, magic verify, password signup verify, refresh
export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: AuthTokenType;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

// ── AuthMessageResponse ───────────────────────────────────────────────────────
// Returned by endpoints that only confirm an action was taken (send magic, signup request)
export interface AuthMessageResponse {
  message: string;
}
