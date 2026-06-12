import { useActiveCompany } from "@/shared/contexts/company/active-company-context";
import { useMyCompanies } from "@/shared/hooks/company/use-companies";

export function useCompanySwitcher() {
    const { data: companies = [] } = useMyCompanies();
    const { activeCompanyId, setActiveCompanyId } = useActiveCompany();
    const activeCompany = companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null;

    return {
        companies,
        activeCompany,
        setActiveCompanyId,
    };
}
