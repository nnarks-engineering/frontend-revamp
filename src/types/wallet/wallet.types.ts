/**
 * Wallet types — mirrors backend WalletRead, WalletTransactionRead, PaymentOrderRead schemas.
 */
import type { Currency } from "../shared/shared.enums";

import type {
  TxStatus,
  TxType,
  WalletOwnerType,
  WalletPaymentProvider,
} from "./wallet.enums";

export interface Wallet {
  id: string;
  owner_id: string;
  owner_type: WalletOwnerType;
  currency: Currency;
  available_balance: number;
  locked_balance: number;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  tx_type: TxType;
  amount: number;
  reference: string;
  status: TxStatus;
}

export interface PaymentOrder {
  id: string;
  wallet_id: string;
  amount: number;
  currency: Currency;
  provider: WalletPaymentProvider;
  provider_reference: string | null;
  status: TxStatus;
}

export interface DepositPayload {
  amount: number;
  currency?: Currency;
}

export interface TransferPayload {
  from_wallet_id: string;
  to_wallet_id: string;
  amount: number;
  reference: string;
}
