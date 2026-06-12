import { useQuery } from "@tanstack/react-query";

import { listServices } from "@/shared/api/service/services";
import { QUERY_KEYS } from "@/shared/lib/constants";

export function useMyServices(companyId?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.services, companyId],
    queryFn: () => listServices({ company_id: companyId }),
    enabled: !!companyId,
    select: (data) => data.items ?? [],
  });
}
