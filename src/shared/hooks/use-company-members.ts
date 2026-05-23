import {
  inviteCompanyMember,
  listCompanyMembers,
  removeCompanyMember,
  updateCompanyMember,
} from "@/shared/api/companies";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type { CompanyMember, CompanyMemberInvite, CompanyMemberUpdate } from "@/types/companies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCompanyMembers(companyId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.companyMembers(companyId ?? ""),
    queryFn: () => listCompanyMembers(companyId!),
    enabled: Boolean(companyId),
  });
}

export function useInviteCompanyMember(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation<CompanyMember, Error, CompanyMemberInvite>({
    mutationFn: (data) => inviteCompanyMember(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyMembers(companyId) });
    },
  });
}

export function useUpdateCompanyMember(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    CompanyMember,
    Error,
    { memberId: string; data: CompanyMemberUpdate }
  >({
    mutationFn: ({ memberId, data }) => updateCompanyMember(companyId, memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyMembers(companyId) });
    },
  });
}

export function useRemoveCompanyMember(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (memberId) => removeCompanyMember(companyId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyMembers(companyId) });
    },
  });
}
