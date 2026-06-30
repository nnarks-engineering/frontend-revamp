import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCompanyAgent, updateCompanyAgentConfig } from "@/shared/api/company/companies";
import { getAgentSettings, updateAgentSettings } from "@/shared/api/user/users";
import { isAuthenticated } from "@/shared/lib/auth";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type { AgentSettingsUpdate } from "@/types";
import type { AgentConfigUpdate, AgentUserCreate } from "@/types/company/company.types";

export function useCreateCompanyAgent(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AgentUserCreate) => createCompanyAgent(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyMembers(companyId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyAgent(companyId) });
    },
  });
}

export function useUpdateCompanyAgentConfig(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AgentConfigUpdate) => updateCompanyAgentConfig(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyAgent(companyId) });
    },
  });
}

export function useAgentSettings() {
  return useQuery({
    queryKey: QUERY_KEYS.agentSettings,
    queryFn: getAgentSettings,
    enabled: isAuthenticated(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateAgentSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AgentSettingsUpdate) => updateAgentSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.agentSettings });
    },
  });
}
