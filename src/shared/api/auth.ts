/**
 * Auth API functions — thin wrappers around Axios calls.
 *
 * These map 1:1 to the backend auth router endpoints.
 * Every function returns the parsed response data, never the raw
 * AxiosResponse, so consumers stay decoupled from HTTP details.
 */

import axios from "axios";
import { api } from "@/shared/lib/api-client";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/shared/lib/constants";
import { storeTokens, clearTokens, getAccessToken } from "@/shared/lib/auth";
import type {
  TokenPair,
  MagicLinkRequest,
  MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest,
  MagicLoginResponse,
} from "@/types/auth";

export type {
  TokenPair,
  MagicLinkRequest,
  MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest,
  MagicLoginResponse,
};

// ── Magic link flow ──────────────────────────────────────────────────

/** Send a magic link / OTP to the given email. */
export async function sendMagicLink(data: MagicLinkRequest): Promise<MagicLoginResponse> {
  const res = await api.post<MagicLoginResponse>(AUTH_ENDPOINTS.MAGIC_SEND, data);
  return res.data;
}

/** Verify a magic link token or OTP code → stores tokens. */
export async function verifyMagicLink(data: MagicVerifyRequest): Promise<TokenPair> {
  const res = await api.post<TokenPair>(AUTH_ENDPOINTS.MAGIC_VERIFY, data);
  storeTokens(res.data);
  return res.data;
}

// ── Password signup flow ─────────────────────────────────────────────

/** Request a password-based signup (sends verification code). */
export async function requestPasswordSignup(
  data: PasswordSignupRequest,
): Promise<MagicLoginResponse> {
  const res = await api.post<MagicLoginResponse>(
    AUTH_ENDPOINTS.PASSWORD_SIGNUP_REQUEST,
    data,
  );
  return res.data;
}

/** Verify the password signup code → stores tokens. */
export async function verifyPasswordSignup(
  data: PasswordSignupVerifyRequest,
): Promise<TokenPair> {
  const res = await api.post<TokenPair>(
    AUTH_ENDPOINTS.PASSWORD_SIGNUP_VERIFY,
    data,
  );
  storeTokens(res.data);
  return res.data;
}

// ── Password login ───────────────────────────────────────────────────

/**
 * Login with email + password.
 *
 * The backend expects `application/x-www-form-urlencoded` (OAuth2 form),
 * so we use URLSearchParams instead of JSON.
 */
export async function loginWithPassword(
  email: string,
  password: string,
): Promise<TokenPair> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post<TokenPair>(AUTH_ENDPOINTS.PASSWORD_LOGIN, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  storeTokens(res.data);
  return res.data;
}

// ── Refresh ──────────────────────────────────────────────────────────

/**
 * Manually refresh the token pair.
 *
 * NOTE: In most cases you don't need to call this directly — the Axios
 * response interceptor in `api-client.ts` handles 401 → refresh
 * automatically. This is exposed for edge cases (e.g. proactive
 * refresh before a long upload).
 */
export async function refreshTokens(refreshToken: string): Promise<TokenPair> {
  const res = await axios.post<TokenPair>(
    `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
    { refresh_token: refreshToken },
    { headers: { "Content-Type": "application/json" } },
  );
  storeTokens(res.data);
  return res.data;
}

// ── Logout ───────────────────────────────────────────────────────────

/** Blacklist the current access token on the server, then clear local storage. */
export async function logout(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Server-side blacklist failed — still clear locally
    }
  }
  clearTokens();
}
