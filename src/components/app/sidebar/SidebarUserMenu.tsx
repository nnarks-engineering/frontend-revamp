import { ChevronsUpDown, LogOut, Settings } from "lucide-react";

import { AppearanceSubMenu, useFontSize } from "@/components/common/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentProfile, useCurrentUser, useLogout } from "@/shared/hooks/auth/use-auth";
import { usePermissions } from "@/shared/hooks/auth/use-permissions";

import { CompanySubMenu } from "./CompanySwitcher";
import { useCompanySwitcher } from "./useCompanySwitcher";
import { UserAvatar } from "./UserAvatar";


export function SidebarUserMenu() {
  const { data: user } = useCurrentUser();
  const { data: profile } = useCurrentProfile();
  const { isClient } = usePermissions();
  const logout = useLogout();

  const { fontSize, setFontSize } = useFontSize();
  const { activeCompany } = useCompanySwitcher();

  const displayName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : (user?.username ?? user?.email ?? "User");

  const email = user?.email ?? "";

  let companyHandle = "Client account";

  if (!isClient) {
    if (activeCompany?.slug) {
      companyHandle = `@${activeCompany.slug}`;
    } else {
      companyHandle = activeCompany?.name ?? "Company";
    }
  }

  const profileImage = (profile as { avatar_url?: string | null } | undefined)?.avatar_url ?? null;



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13.5px] font-medium hover:bg-muted/60 transition-all duration-150 outline-none focus:outline-none">
          <UserAvatar
            firstName={profile?.first_name}
            lastName={profile?.last_name}
            email={user?.email}
            src={profileImage}
            size="md"
          />
          {
            !isClient &&
        <div className="flex-1 min-w-0 text-left hidden lg:block max-w-32">
            <p className="text-[13px] font-semibold text-foreground truncate">Me</p>
            <p className="text-[11px] text-muted-foreground truncate">{companyHandle}</p>
          </div>
          }

          <ChevronsUpDown className="w-4 h-4 text-muted-foreground/50 shrink-0 hidden lg:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        {/* User info header */}
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2">
            <UserAvatar
              firstName={profile?.first_name}
              lastName={profile?.last_name}
              email={user?.email}
              src={profileImage}
              size="lg"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>

          {/* ↓ drop-in reusable submenus */}
          {!isClient && <CompanySubMenu />}
          <AppearanceSubMenu fontSize={fontSize} setFontSize={setFontSize} />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          {logout.isPending ? "Signing out…" : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
