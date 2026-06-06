import { ClientAnnouncementsPanel } from "@/components/app/dashboard";
import { WeatherWidget, UserProfileCard } from "@/components/app/shared";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { CLIENT_STATS } from "./constants";
import { DashboardProjects } from "./DashboardProjects";
import { MinimalStatCard } from "@/components/ui/minimal-stat-card";
import { Card } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import { TeamActionCard } from "../../shared/TeamInviteOrMessageCard";

export function ClientHomePage() {
  useRightPanel(<ClientAnnouncementsPanel />, { openOnMount: true, icon: Megaphone });

  return (
    <div className="space-y-6 max-w-350 mx-auto @container bg-background-space p-4 @md:p-6">
      <div className="flex justify-between flex-wrap gap-4">
        <UserProfileCard />
        <Card className="w-full max-w-72">
           <WeatherWidget />
        </Card>
        <TeamActionCard/>

      </div>

      <Card className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-5">
        {CLIENT_STATS.map((stat) => (
          <MinimalStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            className=""
          />
        ))}
      </Card>

      <div className="pt-2">
        <DashboardProjects />
      </div>
    </div>
  );
}
