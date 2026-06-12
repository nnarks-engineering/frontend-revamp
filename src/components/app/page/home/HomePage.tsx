import { usePermissions } from "@/shared/hooks/use-permissions";

import { ClientHomePage } from "./ClientHomePage";
import { VendorHomePage } from "./VendorHomePage";

export function HomePage() {
  const { isClient } = usePermissions();

  return isClient ? <ClientHomePage /> : <VendorHomePage />;
}
