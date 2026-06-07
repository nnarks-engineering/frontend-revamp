import { useState, useMemo } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { Company } from "@/types/companies";
import { Plus, ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersTab } from "./MembersTab";
import { RolesTab } from "./RolesTab";
import { InvitationsTab } from "./InvitationsTab";
import { InviteMemberDialog } from "./InviteMemberDialog";
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { UserProfileCard } from "@/components/app/shared/UserProfileCard";
import { UserListCard } from "@/components/app/dashboard/UserListCard";
import type { UserListItem } from "@/components/app/dashboard/UserListCard";
import {
  ModuleLayout,
  ModuleLayoutHeader,
  ModuleLayoutHeaderContent,
  ModuleLayoutTitle,
  ModuleLayoutDescription,
  ModuleLayoutHeaderActions,
  ModuleLayoutToolbar,
  ModuleLayoutToolbarCenter,
  ModuleLayoutToolbarRight,
} from "@/components/ui/module-layout";
// import { useCurrentUser, useCurrentProfile } from "@/shared/hooks/use-auth";
import { useCompanyMembers } from "@/shared/hooks/use-company-members";

interface TeamPageClientProps {
  readonly company: Company;
}

type TabKey = "members" | "roles" | "invitations";

const SEARCH_HIDDEN_TABS = new Set<TabKey>(["roles"]);

export function TeamPageClient({ company }: TeamPageClientProps) {
  const { tab, q, page } = useSearch({ from: "/_app/organization/team" });
  const navigate = useNavigate();

  const setTab = (value: TabKey) => {
    navigate({ to: ".", search: { tab: value, q: "", page: 1 } }).catch(() => {});
  };

  const setSearch = (value: string) => {
    navigate({ to: ".", search: { tab, q: value, page: 1 } }).catch(() => {});
  };

  const setPage = (value: number) => {
    navigate({ to: ".", search: { tab, q, page: value } }).catch(() => {});
  };

  const showSearch = !SEARCH_HIDDEN_TABS.has(tab);
  const [inviteOpen, setInviteOpen] = useState(false);

  // const { data: user } = useCurrentUser();
  // const { data: profile } = useCurrentProfile();
  const { data: membersData } = useCompanyMembers(company.id);

  // const ownerName = useMemo(() => {
  //   const first = profile?.first_name;
  //   const last = profile?.last_name;
  //   if (first ?? last) return [first, last].filter(Boolean).join(" ");
  //   return user?.username ?? user?.email ?? "You";
  // }, [profile, user]);

  const adminMembers = useMemo<UserListItem[]>(() => {
    if (!membersData) return [];
    return [...membersData]
      .sort((a, b) => (b.joined_at ?? b.invited_at).localeCompare(a.joined_at ?? a.invited_at))
      .slice(0, 5).filter((m) => m.role === "admin")
      .map((m) => ({
        id: m.id,
        name: m.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        handle: m.email,
      }));
  }, [membersData]);

  return (
    <div className="mx-auto pb-12 px-6 @container">
      {/* Header */}


      <div className="flex flex-col @4xl:flex-row items-start gap-6">
      <ModuleLayout className="w-full flex-1 min-w-0">
       <ModuleLayoutHeader variant="tertiary">
        {/* Illustrative decoration — matches TeamMembersCard / ProjectsCard pattern */}
        <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-orange-50 pointer-events-none" aria-hidden />
        {/* Decorative gradient blobs */}
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-orange-10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <ModuleLayoutHeaderContent>
          <ModuleLayoutTitle>Team Management</ModuleLayoutTitle>
          <ModuleLayoutDescription>
            Manage your organization's members, roles, and invitations.
          </ModuleLayoutDescription>
        </ModuleLayoutHeaderContent>
        <ModuleLayoutHeaderActions>
          <Button variant="tertiary" size="sm" className="gap-2" onClick={() => setInviteOpen(true)}>
            <Plus className="w-4 h-4" />
            Invite Member
          </Button>
        </ModuleLayoutHeaderActions>
      </ModuleLayoutHeader>
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="px-6">
          {/* ── Toolbar ─────────────────────────────────────────── */}
          <div className="border rounded-md">
          <ModuleLayoutToolbar className="flex-wrap gap-2">
            {/* Left: Tabs */}
            <TabsList variant="tertiary">
              <TabsTrigger value="members" className="gap-1.5 font-poppins">
                Members
              </TabsTrigger>
              {/* <TabsTrigger value="roles" className="gap-1.5">
                Roles
              </TabsTrigger> */}
              <TabsTrigger value="invitations" className="gap-1.5">
                Invitations
              </TabsTrigger>
            </TabsList>

            {/* Center: Search */}
            <ModuleLayoutToolbarCenter>
              {showSearch && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search..."
                    value={q}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              )}
            </ModuleLayoutToolbarCenter>

            {/* Right: Invite button */}
            <ModuleLayoutToolbarRight>
              <Button variant="outline" className="gap-2">
                <ListFilter className="w-4 h-4" />
                Show Filter
              </Button>
            </ModuleLayoutToolbarRight>
          </ModuleLayoutToolbar>

          {/* ── Content ─────────────────────────────────────────── */}
          <TabsContent value="members" className="">
            <MembersTab companyId={company.id} search={q} page={page} onPageChange={setPage} />
          </TabsContent>
          <TabsContent value="roles" className="">
            <RolesTab />
          </TabsContent>
          <TabsContent value="invitations" className="">
            <InvitationsTab companyId={company.id} search={q} page={page} onPageChange={setPage} />
          </TabsContent>
          </div>
        </Tabs>
      </ModuleLayout>

      {/* Right panel */}
      <aside className="w-full @4xl:w-64 shrink-0 flex flex-col gap-4 sticky top-0 self-start">
        <UserProfileCard/>

        <UserListCard
          title="Admin Members"
          users={adminMembers}
        />
      </aside>
      </div>
      <InviteMemberDialog
        companyId={company.id}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
      />
    </div>
  );
}



