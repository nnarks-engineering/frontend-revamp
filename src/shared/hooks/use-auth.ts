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

import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS, STORAGE_KEYS } from "@/shared/lib/constants";

import {
  loginWithPassword,
  logout,
  requestPasswordSignup,
  sendMagicLink,
  verifyMagicLink,
  verifyPasswordSignup,
} from "@/shared/api/auth";

import { getMe, getMyProfile } from "@/shared/api/users";
import { listMyCompanies } from "@/shared/api/companies";
import type {
  MagicLinkRequest,
  MagicVerifyRequest,
  PasswordSignupRequest,
  PasswordSignupVerifyRequest,
} from "@/types/auth";
import type { ProfileRead, UserRead } from "@/types/users";

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

/** Verify magic link token or OTP code → sends new user to onboarding. */
export function useVerifyMagicLink() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: MagicVerifyRequest) => verifyMagicLink(data),
    onSuccess: async () => {
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, "vendor");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      let onboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true";
      
      if (!onboarded) {
        try {
          const [profile, companies] = await Promise.all([getMyProfile(), listMyCompanies()]);
          if (profile.first_name && profile.last_name && companies.length > 0) {
            onboarded = true;
            localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
          }
        } catch (e) {
          // Ignore
        }
      }
      navigate({ to: onboarded ? "/org" : "/onboarding/org" });
    },
  });
}

/** Request a password-based signup. */
export function useRequestPasswordSignup() {
  return useMutation({
    mutationFn: (data: PasswordSignupRequest) => requestPasswordSignup(data),
  });
}

/** Verify password signup code → sends new user to onboarding. */
export function useVerifyPasswordSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordSignupVerifyRequest) => verifyPasswordSignup(data),
    onSuccess: async () => {
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, "vendor");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      let onboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true";
      
      if (!onboarded) {
        try {
          const [profile, companies] = await Promise.all([getMyProfile(), listMyCompanies()]);
          if (profile.first_name && profile.last_name && companies.length > 0) {
            onboarded = true;
            localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
          }
        } catch (e) {
          // Ignore
        }
      }
      navigate({ to: onboarded ? "/org" : "/onboarding/org" });
    },
  });
}

/** Login with email + password → routes based on onboarding status. */
export function useLoginWithPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
      userType?: "vendor" | "client";
    }) => loginWithPassword(email, password),
    onSuccess: async (_data, variables) => {
      const type = variables.userType ?? "vendor";
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, type);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      
      let onboarded = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true";
      
      if (!onboarded && type === "vendor") {
        try {
          const [profile, companies] = await Promise.all([getMyProfile(), listMyCompanies()]);
          if (profile.first_name && profile.last_name && companies.length > 0) {
            onboarded = true;
            localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
          }
        } catch (e) {
          // Ignore
        }
      }

      if (type === "client") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: onboarded ? "/org" : "/onboarding/org" });
      }
    },
  });
}

/** Logout — clears cache, clears tokens, redirects to the correct login page. */
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      const userType = localStorage.getItem(STORAGE_KEYS.USER_TYPE);
      queryClient.clear();
      navigate({ to: userType === "client" ? "/login" : "/vendor/login" });
    },
  });
}
