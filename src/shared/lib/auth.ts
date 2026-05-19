/**
 * Token storage & auth state helpers.
 *
 * Tokens live in localStorage so they survive page reloads.
 * The access token is attached to every API request via the Axios
 * interceptor in `api-client.ts`.
 */

import type { TokenPair } from "@/types/auth";
import { STORAGE_KEYS } from "./constants";

export type { TokenPair };

// ── Read ─────────────────────────────────────────────────────────────
export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

// ── Write ────────────────────────────────────────────────────────────
export function storeTokens(pair: TokenPair): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, pair.access_token);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, pair.refresh_token);
  localStorage.setItem(STORAGE_KEYS.ACCESS_EXPIRES, pair.access_token_expires_at);
  localStorage.setItem(STORAGE_KEYS.REFRESH_EXPIRES, pair.refresh_token_expires_at);
}

export function clearTokens(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ACCESS_EXPIRES);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_EXPIRES);
}

// ── Derived state ────────────────────────────────────────────────────

/** True when a stored access token exists (does NOT verify expiry). */
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

/**
 * True when the access token has expired (or is about to within
 * `bufferSeconds`). Callers can use this to decide whether to
 * silently refresh before making a request.
 */
export function isAccessTokenExpired(bufferSeconds = 30): boolean {
  const expiresStr = localStorage.getItem(STORAGE_KEYS.ACCESS_EXPIRES);
  if (!expiresStr) return true;

  const expiresAt = new Date(expiresStr).getTime();
  return Date.now() >= expiresAt - bufferSeconds * 1000;
}
