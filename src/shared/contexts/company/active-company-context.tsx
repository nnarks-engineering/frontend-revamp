import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

import { QUERY_KEYS } from "@/shared/lib/constants";
import { queryClient } from "@/shared/lib/query-client";

export const ACTIVE_COMPANY_KEY = "nnarks_active_company_id";

interface ActiveCompanyContextValue {
  activeCompanyId: string | null;
  setActiveCompanyId: (id: string) => void;
}

const ActiveCompanyContext = createContext<ActiveCompanyContextValue | null>(null);

export function ActiveCompanyProvider({ children }: { children: ReactNode }) {
  const [activeCompanyId, setActiveCompanyIdState] = useState<string | null>(
    () => localStorage.getItem(ACTIVE_COMPANY_KEY)
  );

  const setActiveCompanyId = useCallback((id: string) => {
    localStorage.setItem(ACTIVE_COMPANY_KEY, id);
    setActiveCompanyIdState(id);
    // Invalidate queries whose keys don't include companyId so they refetch for the new org
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
  }, []);

  return (
    <ActiveCompanyContext.Provider value={{ activeCompanyId, setActiveCompanyId }}>
      {children}
    </ActiveCompanyContext.Provider>
  );
}

export function useActiveCompany() {
  const ctx = useContext(ActiveCompanyContext);
  if (!ctx) throw new Error("useActiveCompany must be used within ActiveCompanyProvider");
  return ctx;
}
