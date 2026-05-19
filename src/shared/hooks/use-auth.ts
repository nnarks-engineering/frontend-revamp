/**
 * Auth-related TanStack Query hooks.
 *
 * These are the hooks you call from components:
 *
 *   const { data: user }   = useCurrentUser();
 *   const loginMutation     = useLoginWithPassword();
 *   const logoutMutation    = useLogout();
 *
 * All hooks use the centralized query keys from `constants.ts` so
 * invalidation is always consistent.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { QUERY_KEYS } from "@/shared/lib/constants";
import { isAuthenticated } from "@/shared/lib/auth";

import {
  sendMagicLink,
  verifyMagicLink,
  requestPasswordSignup,
  verifyPasswordSignup,
  loginWithPassword,
  logout,
} from "@/shared/api/auth";

import { getMe, getMyProfile } from "@/shared/api/users";
import type { UserRead, ProfileRead } from "@/types/users";
import type {
  MagicLinkRequest,
  MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest,
} from "@/types/auth";

// ═══════════════════════════════════════════════════════════════════
// Queries
// ═══════════════════════════════════════════════════════════════════

/**
 * Fetch the current authenticated user.
 *
 * Enabled only when tokens exist in localStorage — avoids a wasted
 * 401 request on public pages.
 */
export function useCurrentUser() {
  return useQuery<UserRead>({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: getMe,
    enabled: isAuthenticated(),
    staleTime: 1000 * 60 * 5, // user data rarely changes mid-session
    retry: false,             // if 401 → let the interceptor handle it
  });
}

/** Fetch the current user's profile. */
export function useCurrentProfile() {
  return useQuery<ProfileRead>({
    queryKey: QUERY_KEYS.currentProfile,
    queryFn: getMyProfile,
    enabled: isAuthenticated(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

// ═══════════════════════════════════════════════════════════════════
// Mutations
// ═══════════════════════════════════════════════════════════════════

/** Send magic link / OTP. */
export function useSendMagicLink() {
  return useMutation({
    mutationFn: (data: MagicLinkRequest) => sendMagicLink(data),
  });
}

/** Verify magic link token or OTP code → auto-fetches user. */
export function useVerifyMagicLink() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: MagicVerifyRequest) => verifyMagicLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      navigate({ to: "/dashboard" });
    },
  });
}

/** Request a password-based signup. */
export function useRequestPasswordSignup() {
  return useMutation({
    mutationFn: (data: PasswordSignupRequest) => requestPasswordSignup(data),
  });
}

/** Verify password signup code → auto-fetches user. */
export function useVerifyPasswordSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordSignupVerifyRequest) => verifyPasswordSignup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      navigate({ to: "/dashboard" });
    },
  });
}

/** Login with email + password → auto-fetches user. */
export function useLoginWithPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithPassword(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      navigate({ to: "/dashboard" });
    },
  });
}

/** Logout — clears cache, clears tokens, redirects to login. */
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      // Always clear everything, even if the server call failed
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });
}
