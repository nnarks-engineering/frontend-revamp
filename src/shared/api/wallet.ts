/**
 * Wallet API functions.
 *
 * Maps to the backend `/wallet/` endpoints.
 */

import { api } from "@/shared/lib/api-client";
import { WALLET_ENDPOINTS } from "@/shared/lib/constants";
import type { PaginatedResponse, PageParams } from "@/types/common";
import type { Currency } from "@/types/enums";
import type { Wallet, WalletTransaction, PaymentOrder } from "@/types/wallet";

export type { Wallet, WalletTransaction, PaymentOrder };

// ── Wallet ────────────────────────────────────────────────────────────

/** POST /wallet — create a new wallet for a company */
export async function createWallet(
  company_id: string,
  currency: Currency,
): Promise<Wallet> {
  const res = await api.post<Wallet>(WALLET_ENDPOINTS.WALLET, {
    company_id,
    currency,
  });
  return res.data;
}

/** GET /wallet?company_id=&currency= — get a company's wallet */
export async function getWallet(
  company_id: string,
  currency?: Currency,
): Promise<Wallet> {
  const res = await api.get<Wallet>(WALLET_ENDPOINTS.WALLET, {
    params: { company_id, ...(currency && { currency }) },
  });
  return res.data;
}

/** POST /wallet/deposit — initiate a deposit and get a payment order */
export async function initiateDeposit(
  company_id: string,
  amount: number,
  currency?: Currency,
): Promise<PaymentOrder> {
  const res = await api.post<PaymentOrder>(WALLET_ENDPOINTS.DEPOSIT, {
    company_id,
    amount,
    ...(currency && { currency }),
  });
  return res.data;
}

/** POST /wallet/deposit/:orderId/confirm — confirm a completed deposit */
export async function confirmDeposit(orderId: string): Promise<Wallet> {
  const res = await api.post<Wallet>(WALLET_ENDPOINTS.CONFIRM_DEPOSIT(orderId));
  return res.data;
}

/** POST /wallet/transfer — transfer between wallets (204 no content) */
export async function transfer(
  company_id: string,
  from_wallet_id: string,
  to_wallet_id: string,
  amount: number,
  reference: string,
): Promise<void> {
  await api.post(WALLET_ENDPOINTS.TRANSFER, {
    company_id,
    from_wallet_id,
    to_wallet_id,
    amount,
    reference,
  });
}

/** GET /wallet/transactions?company_id=&currency= — list transactions */
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
