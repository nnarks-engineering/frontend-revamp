export const WalletOwnerType = {
  USER: "USER",
  PROJECT: "PROJECT",
} as const;
export type WalletOwnerType = (typeof WalletOwnerType)[keyof typeof WalletOwnerType];

export const TxType = {
  DEPOSIT: "DEPOSIT",
  LOCK: "LOCK",
  RELEASE: "RELEASE",
  WITHDRAWAL: "WITHDRAWAL",
  TRANSFER: "TRANSFER",
} as const;
export type TxType = (typeof TxType)[keyof typeof TxType];

export const TxStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;
export type TxStatus = (typeof TxStatus)[keyof typeof TxStatus];

export const WalletPaymentProvider = {
  SIMULATOR: "SIMULATOR",
  FLUTTERWAVE: "FLUTTERWAVE",
  STRIPE: "STRIPE",
} as const;
export type WalletPaymentProvider = (typeof WalletPaymentProvider)[keyof typeof WalletPaymentProvider];
