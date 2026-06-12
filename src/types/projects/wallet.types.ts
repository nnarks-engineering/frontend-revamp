import type { Currency } from "@/types/shared.enums";

export interface ProjectWalletResponse {
  id: string;
  owner_id: string;
  owner_type: string;
  currency: Currency;
  available_balance: string;
  locked_balance: string;
}
