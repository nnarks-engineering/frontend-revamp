import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCheckoutSession, cancelSubscription, getSubscription } from "@/shared/api/billing/billing";
import type { CheckoutRequest, CancelRequest } from "@/types/billing";
import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS } from "@/shared/lib/constants";

export function useSubscription(companyId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.billingSubscription(companyId),
    queryFn: () => getSubscription(companyId),
    enabled: isAuthenticated() && Boolean(companyId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: (data: CheckoutRequest) => createCheckoutSession(data),
  });
}

export function useCancelSubscription(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CancelRequest) => cancelSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billingSubscription(companyId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.company(companyId) });
    },
  });
}
