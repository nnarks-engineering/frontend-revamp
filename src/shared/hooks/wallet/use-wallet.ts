import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  confirmDeposit,
  createWallet,
  getWallet,
  initiateDeposit,
  listTransactions,
  transfer,
} from "@/shared/api/wallet/wallet";
import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type { Currency } from "@/types";
import type { PageParams } from "@/types/common";
import type { DepositRequest, TransferRequest } from "@/types/wallet/wallet.types";

/** Fetch the wallet for a company. */
export function useWallet(companyId: string | null, currency?: Currency) {
  return useQuery({
    queryKey: [...QUERY_KEYS.wallet(companyId ?? ""), currency ?? "default"],
    queryFn: () => getWallet(companyId as string, currency),
    enabled: isAuthenticated() && Boolean(companyId),
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

/** Paginated list of wallet transactions. */
export function useWalletTransactions(
  companyId: string | null,
  currency?: Currency,
  params?: PageParams,
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.walletTransactions(companyId ?? ""),
      currency ?? "default",
      params,
    ],
    queryFn: () => listTransactions(companyId as string, currency, params),
    enabled: isAuthenticated() && Boolean(companyId),
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

/** Initiate a deposit. */
export function useInitiateDeposit(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepositRequest) => initiateDeposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet(companyId) });
    },
  });
}

/** Confirm a deposit order. */
export function useConfirmDeposit(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => confirmDeposit(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet(companyId) });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.walletTransactions(companyId),
      });
    },
  });
}

/** Create a wallet. */
export function useCreateWallet(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (currency: Currency) => createWallet(companyId, currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet(companyId) });
    },
  });
}

/** Transfer funds. */
export function useTransfer(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferRequest) => transfer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wallet(companyId) });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.walletTransactions(companyId),
      });
    },
  });
}
