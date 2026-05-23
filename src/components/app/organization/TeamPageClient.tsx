import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import type { Company } from "@/types/companies";
import { Users2, ShieldCheck, Mail } from "lucide-react";
import { MembersTab } from "./MembersTab";
import { RolesTab } from "./RolesTab";
import { InvitationsTab } from "./InvitationsTab";

interface TeamPageClientProps {
  company: Company;
}

type TabKey = "members" | "roles" | "invitations";

export function TeamPageClient({ company }: TeamPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("members");

  const tabs = [
    { id: "members", label: "Members", icon: Users2 },
    { id: "roles", label: "Roles", icon: ShieldCheck },
    { id: "invitations", label: "Invitations", icon: Mail },
  ] as const;

  return (
    <div className="max-w-[1000px] mx-auto pb-12 px-6 pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your organization's members, roles, and invitations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border/60 overflow-x-auto scrollbar-hide mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-semibold transition-colors whitespace-nowrap",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-t-lg"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-border/40 p-6 min-h-[400px]">
        {activeTab === "members" && <MembersTab companyId={company.id} />}
        {activeTab === "roles" && <RolesTab />}
        {activeTab === "invitations" && <InvitationsTab companyId={company.id} />}
      </div>
    </div>
  );
}
