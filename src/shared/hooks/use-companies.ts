import { listMyCompanies } from "@/shared/api/companies";
import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS } from "@/shared/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useMyCompanies() {
    return useQuery({
        queryKey: QUERY_KEYS.myCompanies,
        queryFn: listMyCompanies,
        enabled: isAuthenticated(),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}
