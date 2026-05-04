/**
 * Centralized application constants.
 *
 * Every env variable is read here once. The rest of the app imports
 * from this file — never from `import.meta.env` directly.
 */

// ── API ──────────────────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

export const WS_BASE_URL =
  import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/api/v1";

// ── Auth endpoints (relative to API_BASE_URL) ────────────────────────
export const AUTH_ENDPOINTS = {
  /** POST — magic link OTP send */
  MAGIC_SEND: "/auth/magic/send",
  /** POST — magic link OTP verify → TokenPair */
  MAGIC_VERIFY: "/auth/magic/verify",
  /** POST — email + password signup request (sends verification code) */
  PASSWORD_SIGNUP_REQUEST: "/auth/password/signup/request",
  /** POST — verify signup code → TokenPair */
  PASSWORD_SIGNUP_VERIFY: "/auth/password/signup/verify",
  /** POST — email + password login (OAuth2 form) → TokenPair */
  PASSWORD_LOGIN: "/auth/password/login",
  /** POST — refresh token → new TokenPair */
  REFRESH: "/auth/refresh",
  /** POST — blacklist current token, 204 */
  LOGOUT: "/auth/logout",
} as const;

// ── User endpoints ───────────────────────────────────────────────────
export const USER_ENDPOINTS = {
  ME: "/users/me",
  MY_PROFILE: "/users/me/profile",
  USERNAME_AVAILABLE: (username: string) =>
    `/users/username/${encodeURIComponent(username)}/available`,
} as const;

// ── Project endpoints ────────────────────────────────────────────────
export const PROJECT_ENDPOINTS = {
  LIST: "/projects",
  DETAIL: (id: string) => `/projects/${id}`,
  MILESTONES: (id: string) => `/projects/${id}/milestones`,
  MILESTONE_DETAIL: (projectId: string, milestoneId: string) =>
    `/projects/${projectId}/milestones/${milestoneId}`,
  MILESTONE_EVIDENCE: (projectId: string, milestoneId: string) =>
    `/projects/${projectId}/milestones/${milestoneId}/evidence`,
  INVITE_MEMBER: (id: string) => `/projects/${id}/members/invite`,
  AI_PLAN: (id: string) => `/projects/${id}/ai-plan`,
  ACCEPT_INVITATION: "/projects/invitations/accept",
} as const;

// ── Storage keys ─────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "nnarks_access_token",
  REFRESH_TOKEN: "nnarks_refresh_token",
  ACCESS_EXPIRES: "nnarks_access_expires",
  REFRESH_EXPIRES: "nnarks_refresh_expires",
} as const;

// ── Query keys (TanStack Query) ──────────────────────────────────────
export const QUERY_KEYS = {
  currentUser: ["user", "me"] as const,
  currentProfile: ["user", "profile"] as const,
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  milestones: (projectId: string) => ["projects", projectId, "milestones"] as const,
} as const;
