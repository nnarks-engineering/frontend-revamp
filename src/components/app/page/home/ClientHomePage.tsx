import { ClientAnnouncementsPanel } from "@/components/app/dashboard";
import { WeatherWidget } from "@/components/app/shared";
import { useCurrentProfile } from "@/shared/hooks/use-auth";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { CLIENT_STATS } from "./constants";
import { ProjectsModule } from "@/components/app/page/projects/shared";

export function ClientHomePage() {
  const { data: profile } = useCurrentProfile();
  useRightPanel(<ClientAnnouncementsPanel />, { openOnMount: true });

  return (
    <div className="space-y-6 max-w-350 mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-millik md:text-2xl font-bold text-foreground tracking-tight">
            Welcome back, {profile?.first_name ?? "There"} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        <WeatherWidget />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {CLIENT_STATS.map((stat) => (
          <article
            key={stat.id}
            className="rounded-4xl border border-transparent px-6 py-7 shadow-sm min-h-36 flex flex-col justify-between odd:bg-rose-50 even:bg-amber-50"
          >
            <p className="text-[22px] leading-tight font-medium tracking-tight text-zinc-500">
              {stat.label}
            </p>
            <div className="flex items-end justify-between gap-4 pt-6">
              <p className="text-[2.9rem] leading-none font-semibold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="pt-2">
        <ProjectsModule />
      </div>
    </div>
  );
}
