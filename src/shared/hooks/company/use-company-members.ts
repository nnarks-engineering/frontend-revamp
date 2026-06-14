import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  acceptCompanyInvitation,
  getInvitationDetails,
  inviteCompanyMember,
  listCompanyMembers,
  listMyInvitations,
  rejectCompanyInvitation,
  removeCompanyMember,
  resendCompanyInvitation,
  updateCompanyMember,
} from "@/shared/api/company/companies";
import { QUERY_KEYS } from "@/shared/lib/constants";
import type { CompanyMember, CompanyMemberInvite, CompanyMemberUpdate } from "@/types/company/company.types";

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
    mutationFn: (data) => {
// console.log("Inviting member with data:", data); // Debug log
      return inviteCompanyMember(companyId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companyMembers(companyId) });
    },
    onError:(_error)=>{
    }
  });
}

export function useResendCompanyInvitation(companyId: string) {
  return useMutation<void, Error, string>({
    mutationFn: (memberId) => resendCompanyInvitation(companyId, memberId),
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

export function useInvitationDetails(inviteToken: string) {
  return useQuery({
    queryKey: ["invitation-details", inviteToken],
    queryFn: () => getInvitationDetails(inviteToken),
    enabled: Boolean(inviteToken),
    retry: false,
  });
}

export function useRejectCompanyInvitation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (token) => rejectCompanyInvitation(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myCompanies });
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
    },
  });
}

export function useMyInvitations() {
  return useQuery({
    queryKey: ["my-invitations"],
    queryFn: () => listMyInvitations(),
    refetchOnWindowFocus: true,
  });
}

export function useAcceptCompanyInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptCompanyInvitation(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myCompanies });
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
    },
  });
}
