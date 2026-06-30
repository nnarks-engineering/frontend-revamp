/**
 * Auth types — mirrors backend TokenPair and auth request/response schemas.
 */

export interface AuthTokenPair {
    access_token: string;
    refresh_token: string;
    token_type: "bearer";
    access_token_expires_at: string;
    refresh_token_expires_at: string;
}

export interface AuthMagicLinkRequest {
    email: string;
    return_to?: string;
}

export interface AuthMagicVerifyRequest {
    token?: string;
    code?: string;
}

export interface AuthPasswordSignupRequest {
    email: string;
    password: string;
    return_to?: string;
}

export interface AuthPasswordSignupVerifyRequest {
    code?: string;
    token?: string;
}

export interface AuthLogoutRequest {
    access_token: string;
    refresh_token: string;
}

export interface AuthMagicLoginResponse {
    message: string;
}
