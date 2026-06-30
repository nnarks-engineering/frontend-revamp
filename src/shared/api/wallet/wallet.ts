import { api } from "@/shared/lib/api-client";
import { WALLET_ENDPOINTS } from "@/shared/lib/constants";
import type { Currency } from "@/types";
import type { PageParams, PaginatedResponse } from "@/types/common";
import type { DepositRequest, PaymentOrder, TransferRequest, Wallet, WalletTransaction } from "@/types/wallet/wallet.types";


export async function createWallet(
  company_id: string,
  currency: Currency,
): Promise<Wallet> {
  const res = await api.post<Wallet>(WALLET_ENDPOINTS.BASE, {
    company_id,
    currency,
  });
  return res.data;
}

export async function getWallet(
  company_id: string,
  currency?: Currency,
): Promise<Wallet> {
  const res = await api.get<Wallet>(WALLET_ENDPOINTS.BASE, {
    params: { company_id, ...(currency && { currency }) },
  });
  return res.data;
}

export async function initiateDeposit(
  data: DepositRequest,
): Promise<PaymentOrder> {
  const res = await api.post<PaymentOrder>(WALLET_ENDPOINTS.DEPOSIT, data);
  return res.data;
}

export async function confirmDeposit(orderId: string): Promise<Wallet> {
  const res = await api.post<Wallet>(WALLET_ENDPOINTS.CONFIRM_DEPOSIT(orderId));
  return res.data;
}

export async function transfer(
  data: TransferRequest,
): Promise<void> {
  await api.post(WALLET_ENDPOINTS.TRANSFER, data);
}

export async function listTransactions(
  company_id: string,
  currency?: Currency,
  params?: PageParams,
): Promise<PaginatedResponse<WalletTransaction>> {
  const res = await api.get<PaginatedResponse<WalletTransaction>>(
    WALLET_ENDPOINTS.TRANSACTIONS,
    { params: { company_id, ...(currency && { currency }), ...params } },
  );
  return res.data;
}
