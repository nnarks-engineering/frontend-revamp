

import axios from "axios";

import { api } from "@/shared/lib/api-client";
import { clearTokens, getAccessToken, storeTokens } from "@/shared/lib/auth";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/shared/lib/constants";
import type {
  MagicLinkRequest,
  MagicLoginResponse,
  MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest,
  TokenPair,
} from "@/types/auth";

export type {
  MagicLinkRequest, MagicLoginResponse, MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest, TokenPair
};


export async function sendMagicLink(data: MagicLinkRequest): Promise<MagicLoginResponse> {
  const res = await api.post<MagicLoginResponse>(AUTH_ENDPOINTS.MAGIC_SEND, data);
  return res.data;
}

export async function verifyMagicLink(data: MagicVerifyRequest): Promise<TokenPair> {
  const res = await api.post<TokenPair>(AUTH_ENDPOINTS.MAGIC_VERIFY, data);
  storeTokens(res.data);
  return res.data;
}

export async function requestPasswordSignup(
  data: PasswordSignupRequest,
): Promise<MagicLoginResponse> {
  const res = await api.post<MagicLoginResponse>(
    AUTH_ENDPOINTS.PASSWORD_SIGNUP_REQUEST,
    data,
  );
  return res.data;
}

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

export async function refreshTokens(refreshToken: string): Promise<TokenPair> {
  const res = await axios.post<TokenPair>(
    `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
    { refresh_token: refreshToken },
    { headers: { "Content-Type": "application/json" } },
  );
  storeTokens(res.data);
  return res.data;
}

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
