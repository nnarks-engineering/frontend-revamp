/**
 * Pre-configured Axios instance with automatic auth handling.
 *
 * Features:
 *  1. Attaches `Authorization: Bearer <token>` to every request.
 *  2. On 401, silently refreshes the access token using the stored
 *     refresh token, then retries the original request exactly once.
 *  3. If the refresh itself fails, clears all tokens and redirects to
 *     the login page so the user re-authenticates.
 *
 * Usage:
 *   import { api } from "@/shared/lib/api-client";
 *   const { data } = await api.get("/users/me");
 */

import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  storeTokens,
  type TokenPair,
} from "./auth";
import { API_BASE_URL, AUTH_ENDPOINTS } from "./constants";

// ── Axios instance ───────────────────────────────────────────────────
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

// ── Request interceptor — attach token ───────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor — silent refresh on 401 ─────────────────────

/**
 * We use a flag + queue pattern so that if multiple requests fail with
 * 401 simultaneously, only ONE refresh request is fired. Every other
 * request waits for that single refresh and then retries.
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null): void {
  for (const { resolve, reject } of failedQueue) {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  }
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only intercept 401s that are NOT unauthenticated auth endpoints.
    // Verify/login endpoints return 401 for wrong credentials — that is NOT
    // a session-expiry and must NOT trigger a refresh/redirect to /login.
    const isUnauthenticatedEndpoint =
      originalRequest.url === AUTH_ENDPOINTS.REFRESH ||
      originalRequest.url === AUTH_ENDPOINTS.MAGIC_VERIFY ||
      originalRequest.url === AUTH_ENDPOINTS.PASSWORD_SIGNUP_VERIFY ||
      originalRequest.url === AUTH_ENDPOINTS.PASSWORD_LOGIN;

    if (error.response?.status !== 401 || originalRequest._retry || isUnauthenticatedEndpoint) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      // Call the refresh endpoint directly with a plain axios call
      // (not through `api`) to avoid interceptor loops.
      const { data } = await axios.post<TokenPair>(
        `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
        { refresh_token: refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      storeTokens(data);
      processQueue(null, data.access_token);

      // Retry the original request with the new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
