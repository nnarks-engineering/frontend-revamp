import { ShieldCheck, Crown, Users, Settings } from "lucide-react";

export function RolesTab() {
  const roles = [
    {
      id: "owner",
      title: "Owner",
      icon: <Crown className="w-5 h-5 text-amber-600" />,
      description: "Full administrative access. Can manage billing, transfer ownership, and delete the organization.",
      permissions: ["Manage billing & plans", "Delete organization", "Transfer ownership", "Manage all members and settings"],
    },
    {
      id: "admin",
      title: "Admin",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      description: "Can manage members, services, and organization settings. Cannot manage billing or delete the organization.",
      permissions: ["Invite and remove members", "Create and edit services", "Manage KYC and verification", "Configure agent settings"],
    },
    {
      id: "member",
      title: "Member",
      icon: <Users className="w-5 h-5 text-foreground/70" />,
      description: "Standard access. Can view services and participate in assigned projects and chats.",
      permissions: ["View services and members", "Accept escrow payments", "Fulfill escrow milestones", "Participate in proposals"],
    },
    {
      id: "viewer",
      title: "Viewer",
      icon: <Settings className="w-5 h-5 text-muted-foreground" />,
      description: "Read-only access. Can view organization details but cannot make changes.",
      permissions: ["View organization profile", "View services", "View members list"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-foreground">Organization Roles</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Nnarks uses a fixed set of roles to manage access to your organization. Each role comes with specific permissions designed for different levels of responsibility.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <div key={role.id} className="p-5 rounded-xl border border-border/40 bg-muted/5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              {role.icon}
              <h4 className="font-bold text-[14px] text-foreground">{role.title}</h4>
            </div>
            <p className="text-[12px] text-muted-foreground mb-4">
              {role.description}
            </p>
            <div className="mt-auto pt-4 border-t border-border/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                Key Permissions
              </span>
              <ul className="space-y-1.5">
                {role.permissions.map((perm, idx) => (
                  <li key={idx} className="text-[11px] font-medium text-foreground/80 flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
