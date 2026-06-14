/**
 * Token storage & auth state helpers.
 *
 * Tokens live in localStorage so they survive page reloads.
 * The access token is attached to every API request via the Axios
 * interceptor in `api-client.ts`.
 */

import type { QueryClient } from "@tanstack/react-query";

import { listMyCompanies } from "@/shared/api/company/companies";
import { getMyProfile } from "@/shared/api/user/users";
import type { AuthTokenPair } from "@/types";
import { UserType } from "@/types/shared/shared.enums";

import { QUERY_KEYS, STORAGE_KEYS } from "./constants";


export type { AuthTokenPair };
export { UserType };

const USER_TYPE_CHANGE_EVENT = "nnarks_user_type_changed";

// ── Read ─────────────────────────────────────────────────────────────
export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

// ── Write ────────────────────────────────────────────────────────────
export function storeTokens(pair: AuthTokenPair): void {
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

export function getStoredUserType(): UserType {
  if (globalThis.window === undefined) {
    return "vendor";
  }

  const raw = localStorage.getItem(STORAGE_KEYS.USER_TYPE);
  return raw === UserType.client ? UserType.client : UserType.vendor;
}

function dispatchUserTypeChange() {
  if (globalThis.window === undefined) {
    return;
  }

  globalThis.dispatchEvent(new Event(USER_TYPE_CHANGE_EVENT));
}

export function setStoredUserType(userType: UserType): void {
  localStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);
  dispatchUserTypeChange();
}

export function clearStoredUserType(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
  dispatchUserTypeChange();
}

export function subscribeToStoredUserType(onStoreChange: () => void): () => void {
  if (globalThis.window === undefined) {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();

  globalThis.addEventListener(USER_TYPE_CHANGE_EVENT, handleChange);
  globalThis.addEventListener("storage", handleChange);

  return () => {
    globalThis.removeEventListener(USER_TYPE_CHANGE_EVENT, handleChange);
    globalThis.removeEventListener("storage", handleChange);
  };
}

export function hasUserTypeAccess(
  allowedUserTypes: readonly UserType[] | undefined,
  userType: UserType = getStoredUserType(),
): boolean {
  return !allowedUserTypes || allowedUserTypes.includes(userType);
}

/** Check backend to see if onboarding is complete (has profile and company). */
export async function checkOnboardingComplete(
  queryClient: QueryClient,
  userType: UserType = UserType.vendor,
): Promise<boolean> {
  if (userType === UserType.client) {
    return true;
  }

  try {
    const profile = await queryClient.fetchQuery({
      queryKey: QUERY_KEYS.currentProfile,
      queryFn: getMyProfile,
      staleTime: 1000 * 60 * 5,
    });
    const companies = await queryClient.fetchQuery({
      queryKey: QUERY_KEYS.myCompanies,
      queryFn: listMyCompanies,
      staleTime: 1000 * 60 * 5,
    });

    return !!(profile?.first_name && profile?.last_name && companies?.length > 0);
  } catch {
    return false;
  }
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
