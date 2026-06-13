import { useActiveCompany } from "@/shared/contexts/company/active-company-context";
import { useMyCompanies } from "@/shared/hooks/company/use-companies";

import { getStoredUserType } from "@/shared/lib/auth";

export function useCurrentCompany() {
    const { data: allCompanies = [] } = useMyCompanies();
    const isVendor = getStoredUserType() === "vendor";
    const companies = isVendor ? allCompanies.filter((c) => !c.is_personal) : allCompanies;
    const { activeCompanyId, setActiveCompanyId } = useActiveCompany();
    const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null;

    return {
        companies,
        activeCompany,
        setActiveCompanyId,
    };
}
