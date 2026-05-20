import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  skipVendorProfile,
  submitVendorProfile,
  type VendorProfilePayload,
} from "@/shared/api/onboarding";
import { QUERY_KEYS } from "@/shared/lib/constants";

const DASHBOARD = "/dashboard" as const;

/** Submit vendor profile (company name + description), then go to dashboard. */
export function useSubmitVendorProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VendorProfilePayload) => submitVendorProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentProfile });
      navigate({ to: DASHBOARD });
    },
    onError: (err: Error) => {
      toast.error("Couldn't save company profile", {
        description: err.message ?? "Please try again.",
      });
    },
  });
}

/**
 * Skip vendor onboarding — auto-creates a minimal profile from the
 * user's email prefix and routes to the dashboard.
 */
export function useSkipOnboarding() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (emailPrefix: string) => skipVendorProfile(emailPrefix),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentProfile });
    },
    onSettled: () => {
      // Always navigate — even if the PATCH fails the user can still use the app
      navigate({ to: DASHBOARD });
    },
  });
}
