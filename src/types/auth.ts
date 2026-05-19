/**
 * Auth types — mirrors backend TokenPair and auth request/response schemas.
 */

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

export interface MagicLinkRequest {
  email: string;
}

export interface MagicVerifyRequest {
  token?: string;
  code?: string;
}

export interface PasswordSignupRequest {
  email: string;
  password: string;
}

export interface PasswordSignupVerifyRequest {
  code: string;
}

export interface MagicLoginResponse {
  message: string;
}
