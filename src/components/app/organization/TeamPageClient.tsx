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
import RoundingLine from "@/assets/svg/rounding-line2.svg?react";
import { UserProfileCard } from "@/components/app/shared/UserProfileCard";
import { UserListCard } from "@/components/app/dashboard/UserListCard";
import type { UserListItem } from "@/components/app/dashboard/UserListCard";
import { useCurrentUser, useCurrentProfile } from "@/shared/hooks/use-auth";
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

  const { data: user } = useCurrentUser();
  const { data: profile } = useCurrentProfile();
  const { data: membersData } = useCompanyMembers(company.id);

  const ownerName = useMemo(() => {
    const first = profile?.first_name;
    const last = profile?.last_name;
    if (first ?? last) return [first, last].filter(Boolean).join(" ");
    return user?.username ?? user?.email ?? "You";
  }, [profile, user]);

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
    <div className="mx-auto pb-12 px-6">
      {/* Header */}


      <div className="flex items-start gap-6">
      {/* Main card */}
      <div className="flex-1 min-w-0 bg-background rounded-2xl overflow-clip min-h-100">
       <div className="relative overflow-hidden flex items-start justify-between gap-4 p-6 bg-tertiary-100">
        {/* Illustrative decoration — matches TeamMembersCard / ProjectsCard pattern */}
        <RoundingLine className="absolute -top-3 right-0 scale-x-[-1] text-orange-50 pointer-events-none" aria-hidden />
        {/* Decorative gradient blobs */}
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-orange-10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-foreground font-millik">Team Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your organization's members, roles, and invitations.
          </p>
        </div>
        <Button variant="tertiary" size="sm" className="relative z-10 gap-2 shrink-0" onClick={() => setInviteOpen(true)}>
          <Plus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="px-6">
          {/* ── Toolbar ─────────────────────────────────────────── */}
          <div className="flex items-center gap-3  border rounded-t-lg p-4 border-border">
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
            <div className="flex-1 flex justify-center">
              {showSearch && (
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search..."
                    value={q}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              )}
            </div>

            {/* Right: Invite button */}
            <Button variant="outline" className="gap-2 shrink-0">
              <ListFilter className="w-4 h-4" />
              Show Filter
            </Button>
          </div>

          {/* ── Content ─────────────────────────────────────────── */}
          <TabsContent value="members" className="">
            <MembersTab companyId={company.id} search={q} page={page} onPageChange={setPage} />
          </TabsContent>
          <TabsContent value="roles" className="">
            <RolesTab />
          </TabsContent>
          <TabsContent value="invitations" className="">
            <InvitationsTab companyId={company.id} search={q} page={page} onPageChange={setPage} inviteOpen={inviteOpen} onInviteOpenChange={setInviteOpen} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right panel */}
      <aside className="w-64 shrink-0 flex flex-col gap-4 sticky top-0 self-start">
        <UserProfileCard
          name={ownerName}
          handle={user?.email}
        />
        <UserListCard
          title="Admin Members"
          users={adminMembers}
        />
      </aside>
      </div>
    </div>
  );
}


