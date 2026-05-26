import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  skipVendorProfile,
  submitPersonalInfo,
  submitVendorProfile,
  type PersonalInfoPayload,
  type VendorProfilePayload,
} from "@/shared/api/onboarding";
import { QUERY_KEYS } from "@/shared/lib/constants";

const VENDOR_HOME = "/org" as const;
// const ONBOARDING_ROUTE = "/onboarding/org" as const;

// ── Personal info ─────────────────────────────────────────────────────

/** PATCH /users/me/profile — save first & last name, then advance step. */
export function useSubmitPersonalInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PersonalInfoPayload) => submitPersonalInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentProfile });
    },
    onError: (err: Error) => {
      toast.error("Couldn't save your name", {
        description: err.message ?? "Please try again.",
      });
    },
  });
}

// ── Company setup ─────────────────────────────────────────────────────

/** POST /companies — create the vendor's company, then go to dashboard. */
export function useSubmitVendorProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VendorProfilePayload) => submitVendorProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myCompanies });
      navigate({ to: VENDOR_HOME });
    },
    onError: (err: Error) => {
      toast.error("Couldn't create company", {
        description: err.message ?? "Please try again.",
      });
    },
  });
}

/**
 * POST /companies — auto-create a minimal company from the user's email
 * prefix when they skip the company-setup step, then go to dashboard.
 */
export function useSkipOnboarding() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (emailPrefix: string) => skipVendorProfile(emailPrefix),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myCompanies });
    },
    onSettled: () => {
      navigate({ to: VENDOR_HOME });
    },
  });
}
