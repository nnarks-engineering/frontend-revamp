import { createFileRoute } from "@tanstack/react-router";

import { WalletPageClient } from "@/components/app/page/wallet/WalletPageClient";

export const Route = createFileRoute("/_app/escrow")({
  component: EscrowPage,
});

function EscrowPage() {
  return <WalletPageClient />;
}
