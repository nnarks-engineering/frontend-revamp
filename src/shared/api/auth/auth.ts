
import axios from "axios";

import { api } from "@/shared/lib/api-client";
import { clearTokens, getAccessToken, getRefreshToken, storeTokens } from "@/shared/lib/auth";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/shared/lib/constants";
import type {
  AuthLogoutRequest,
  AuthMagicLinkRequest,
  AuthMagicLoginResponse,
  AuthMagicVerifyRequest,
  AuthPasswordSignupRequest,
  AuthPasswordSignupVerifyRequest,
  AuthTokenPair,
} from "@/types";

export type {
  AuthLogoutRequest,
  AuthMagicLinkRequest,
  AuthMagicLoginResponse,
  AuthMagicVerifyRequest,
  AuthPasswordSignupRequest,
  AuthPasswordSignupVerifyRequest,
  AuthTokenPair,
};


export async function sendMagicLink(data: AuthMagicLinkRequest): Promise<AuthMagicLoginResponse> {
  const res = await api.post<AuthMagicLoginResponse>(AUTH_ENDPOINTS.MAGIC_SEND, data);
  return res.data;
}

export async function verifyMagicLink(data: AuthMagicVerifyRequest): Promise<AuthTokenPair> {
  const res = await api.post<AuthTokenPair>(AUTH_ENDPOINTS.MAGIC_VERIFY, data);
  storeTokens(res.data);
  return res.data;
}

export async function requestPasswordSignup(
  data: AuthPasswordSignupRequest,
): Promise<AuthMagicLoginResponse> {
  const res = await api.post<AuthMagicLoginResponse>(
    AUTH_ENDPOINTS.PASSWORD_SIGNUP_REQUEST,
    data,
  );
  return res.data;
}

export async function verifyPasswordSignup(
  data: AuthPasswordSignupVerifyRequest,
): Promise<AuthTokenPair> {
  const res = await api.post<AuthTokenPair>(
    AUTH_ENDPOINTS.PASSWORD_SIGNUP_VERIFY,
    data,
  );
  storeTokens(res.data);
  return res.data;
}


export async function loginWithPassword(
  email: string,
  password: string,
): Promise<AuthTokenPair> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post<AuthTokenPair>(AUTH_ENDPOINTS.PASSWORD_LOGIN, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  storeTokens(res.data);
  return res.data;
}

export async function refreshTokens(refreshToken: string): Promise<AuthTokenPair> {
  const res = await axios.post<AuthTokenPair>(
    `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
    { refresh_token: refreshToken },
    { headers: { "Content-Type": "application/json" } },
  );
  storeTokens(res.data);
  return res.data;
}

export async function logout(): Promise<void> {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (accessToken && refreshToken) {
    try {
      const body: AuthLogoutRequest = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      await api.post(AUTH_ENDPOINTS.LOGOUT, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch {
      // Server-side blacklist failed — still clear locally
    }
  }
  clearTokens();
}
