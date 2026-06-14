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

import {
  loginWithPassword,
  logout,
  requestPasswordSignup,
  sendMagicLink,
  verifyMagicLink,
  verifyPasswordSignup,
} from "@/shared/api/auth/auth";
import { getMe, getMyProfile, updateMyProfile } from "@/shared/api/user/users";
import {
  checkOnboardingComplete,
  clearStoredUserType,
  isAuthenticated,
  setStoredUserType,
} from "@/shared/lib/auth";
import { QUERY_KEYS, STORAGE_KEYS } from "@/shared/lib/constants";
import type {
  AuthMagicLinkRequest,
  AuthMagicVerifyRequest,
  AuthPasswordSignupRequest,
  AuthPasswordSignupVerifyRequest, ProfileRead, ProfileUpdate, UserRead
} from "@/types";
import type { UserType } from "@/types/shared/shared.enums";
import { UserType as UserTypeEnum } from "@/types/shared/shared.enums";

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

/** Update the current user's profile. */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdate) => {

      return updateMyProfile(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentProfile });
    },
    onError: (_error) => {
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// Mutations
// ═══════════════════════════════════════════════════════════════════

/** Send magic link / OTP. */
export function useSendMagicLink() {
  return useMutation({
    mutationFn: (data: AuthMagicLinkRequest) => sendMagicLink(data),
  });
}

interface VerifyAuthOptions {
  userType?: UserType;
  onVerified?: () => Promise<void> | void;
}

/** Verify magic link token or OTP code → sends new user to onboarding. */
export function useVerifyMagicLink(options?: VerifyAuthOptions) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AuthMagicVerifyRequest) => verifyMagicLink(data),
    onSuccess: async () => {
      const userType = options?.userType ?? UserTypeEnum.vendor;

      if (options?.onVerified) {
        await options.onVerified();
      }

      setStoredUserType(userType);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      const returnTo = new URLSearchParams(globalThis.location.search).get("returnTo");
      if (returnTo) {
        navigate({ to: decodeURIComponent(returnTo) });
      } else if (userType === UserTypeEnum.client) {
        navigate({ to: "/home" });
      } else {
        const onboarded = await checkOnboardingComplete(queryClient);
        navigate({ to: onboarded ? "/home" : "/onboarding/org" });
      }
    },
  });
}

/** Request a password-based signup. */
export function useRequestPasswordSignup() {
  return useMutation({
    mutationFn: (data: AuthPasswordSignupRequest) => requestPasswordSignup(data),
  });
}

/** Verify password signup code → sends new user to onboarding. */
export function useVerifyPasswordSignup(options?: VerifyAuthOptions) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: AuthPasswordSignupVerifyRequest) => verifyPasswordSignup(data),
    onSuccess: async () => {
      const userType = options?.userType ?? UserTypeEnum.vendor;

      if (options?.onVerified) {
        await options.onVerified();
      }

      setStoredUserType(userType);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      const returnTo = new URLSearchParams(globalThis.location.search).get("returnTo");
      if (returnTo) {
        navigate({ to: decodeURIComponent(returnTo) });
      } else if (userType === UserTypeEnum.client) {
        navigate({ to: "/home" });
      } else {
        const onboarded = await checkOnboardingComplete(queryClient);
        navigate({ to: onboarded ? "/home" : "/onboarding/org" });
      }
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
      userType?: UserType;
    }) => loginWithPassword(email, password),
    onSuccess: async (_data, variables) => {
      const type = variables.userType ?? UserTypeEnum.vendor;
      setStoredUserType(type);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });

      const returnTo = new URLSearchParams(globalThis.location.search).get("returnTo");
      if (returnTo) {
        navigate({ to: decodeURIComponent(returnTo) });
      } else if (type === UserTypeEnum.client) {
        navigate({ to: "/home" });
      } else {
        const onboarded = await checkOnboardingComplete(queryClient);
        navigate({ to: onboarded ? "/home" : "/onboarding/org" });
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
      clearStoredUserType();
      queryClient.clear();
      navigate({ to: userType === UserTypeEnum.client ? "/login" : "/vendor/login" });
    },
  });
}
