import { ClientHomePage } from "./ClientHomePage";
import { VendorHomePage } from "./VendorHomePage";
import { usePermissions } from "@/shared/hooks/use-permissions";

export function HomePage() {
  const { isClient } = usePermissions();

  return isClient ? <ClientHomePage /> : <VendorHomePage />;
}
