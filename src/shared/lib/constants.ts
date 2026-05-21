export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

export const WS_BASE_URL =
  import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/api/v1";

// ── Auth endpoints (relative to API_BASE_URL) ────────────────────────
export const AUTH_ENDPOINTS = {
  MAGIC_SEND: "/auth/magic/send",
  MAGIC_VERIFY: "/auth/magic/verify",
  PASSWORD_SIGNUP_REQUEST: "/auth/password/signup/request",
  PASSWORD_SIGNUP_VERIFY: "/auth/password/signup/verify",
  PASSWORD_LOGIN: "/auth/password/login",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
} as const;

// ── User endpoints ───────────────────────────────────────────────────
export const USER_ENDPOINTS = {
  ME: "/users/me",
  MY_PROFILE: "/users/me/profile",
  AGENT_SETTINGS: "/users/me/agent-settings",
  USERNAME_AVAILABLE: (username: string) =>
    `/users/username/${encodeURIComponent(username)}/available`,
} as const;

// ── Company endpoints ────────────────────────────────────────────────
export const COMPANY_ENDPOINTS = {
  LIST: "/companies",
  MY_COMPANIES: "/companies/me",
  ACCEPT_INVITATION: "/companies/invitations/accept",
  DETAIL: (id: string) => `/companies/${id}`,
  MEMBERS: (id: string) => `/companies/${id}/members`,
  MEMBER_DETAIL: (id: string, memberId: string) =>
    `/companies/${id}/members/${memberId}`,
  TRANSFER_OWNERSHIP: (id: string) => `/companies/${id}/transfer-ownership`,
  AGENT: (id: string) => `/companies/${id}/agent`,
  AGENT_CONFIG: (id: string) => `/companies/${id}/agent/config`,
} as const;

// ── Service endpoints ────────────────────────────────────────────────
export const SERVICE_ENDPOINTS = {
  LIST: "/services",
  DETAIL: (id: string) => `/services/${id}`,
} as const;

// ── KYC endpoints ────────────────────────────────────────────────────
export const KYC_ENDPOINTS = {
  GET: "/kyc",
  DOCUMENTS: "/kyc/documents",
} as const;

// ── Wallet endpoints ─────────────────────────────────────────────────
export const WALLET_ENDPOINTS = {
  BASE: "/wallet",
  DEPOSIT: "/wallet/deposit",
  CONFIRM_DEPOSIT: (orderId: string) => `/wallet/deposit/${orderId}/confirm`,
  TRANSFER: "/wallet/transfer",
  TRANSACTIONS: "/wallet/transactions",
} as const;

// ── Proposal endpoints ───────────────────────────────────────────────
export const PROPOSAL_ENDPOINTS = {
  LIST: "/proposals",
  DETAIL: (id: string) => `/proposals/${id}`,
  VOTES: (id: string) => `/proposals/${id}/votes`,
  VOTE_HISTORY: (id: string) => `/proposals/${id}/votes/history`,
} as const;

// ── Messaging endpoints (prefix /sessions) ───────────────────────────
export const MESSAGING_ENDPOINTS = {
  LIST: "/sessions",
  DETAIL: (id: string) => `/sessions/${id}`,
  MESSAGES: (id: string) => `/sessions/${id}/messages`,
  WS: (id: string) => `/sessions/ws/sessions/${id}`,
} as const;

// ── Notification endpoints ───────────────────────────────────────────
export const NOTIFICATION_ENDPOINTS = {
  LIST: "/notifications",
  UNREAD_COUNT: "/notifications/unread-count",
  MARK_READ: "/notifications/read",
  DISMISS_BULK: "/notifications/dismiss",
  MARK_ONE_READ: (id: string) => `/notifications/${id}/read`,
  DISMISS_ONE: (id: string) => `/notifications/${id}/dismiss`,
  WS: "/notifications/ws",
} as const;

// ── Schedule endpoints ───────────────────────────────────────────────
export const SCHEDULE_ENDPOINTS = {
  LIST: "/schedules",
  DETAIL: (id: string) => `/schedules/${id}`,
  RUNS: (id: string) => `/schedules/${id}/runs`,
  RUN_EVENTS: (runId: string) => `/schedules/run/${runId}/events`,
} as const;

// ── Agent endpoints (admin only) ─────────────────────────────────────
export const AGENT_ENDPOINTS = {
  UPDATE_CONFIG: "/agents/config",
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
  ONBOARDING_COMPLETE: "nnarks_onboarding_complete",
  USER_TYPE: "nnarks_user_type",
} as const;

// ── Query keys (TanStack Query) ──────────────────────────────────────
export const QUERY_KEYS = {
  currentUser: ["user", "me"] as const,
  currentProfile: ["user", "profile"] as const,
  agentSettings: ["user", "agent-settings"] as const,
  myCompanies: ["companies", "me"] as const,
  company: (id: string) => ["companies", id] as const,
  companyMembers: (id: string) => ["companies", id, "members"] as const,
  services: ["services"] as const,
  service: (id: string) => ["services", id] as const,
  kyc: (companyId: string) => ["kyc", companyId] as const,
  kycDocuments: (companyId: string) => ["kyc", companyId, "documents"] as const,
  wallet: (companyId: string) => ["wallet", companyId] as const,
  walletTransactions: (companyId: string) => ["wallet", companyId, "transactions"] as const,
  proposals: ["proposals"] as const,
  proposal: (id: string) => ["proposals", id] as const,
  sessions: ["sessions"] as const,
  session: (id: string) => ["sessions", id] as const,
  messages: (sessionId: string) => ["sessions", sessionId, "messages"] as const,
  notifications: ["notifications"] as const,
  notificationsUnreadCount: ["notifications", "unread-count"] as const,
  schedules: ["schedules"] as const,
  schedule: (id: string) => ["schedules", id] as const,
  scheduleRuns: (id: string) => ["schedules", id, "runs"] as const,
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  milestones: (projectId: string) => ["projects", projectId, "milestones"] as const,
} as const;

