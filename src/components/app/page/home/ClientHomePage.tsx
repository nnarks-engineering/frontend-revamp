import { ClientAnnouncementsPanel } from "@/components/app/dashboard";
import { WeatherWidget } from "@/components/app/shared";
import { useCurrentProfile } from "@/shared/hooks/use-auth";
import { useRightPanel } from "@/shared/hooks/use-right-panel";
import { CLIENT_STATS } from "./constants";

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl border border-border/50 bg-background p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">Client Workspace Health</h3>
                <p className="text-[12px] text-muted-foreground mt-1">Coverage for your current project portfolio.</p>
              </div>
              <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">Updated now</span>
            </div>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Milestone approvals</span>
                <span className="font-semibold text-foreground">89%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[89%] bg-primary rounded-full" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-muted-foreground">Escrow compliance</span>
                <span className="font-semibold text-foreground">100%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background p-5">
            <h3 className="text-[15px] font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button type="button" className="rounded-xl border border-border/60 px-3 py-3 text-left hover:bg-muted/40 transition-colors">
                <span className="block w-4 h-4 text-primary mb-2" />
                <p className="text-[13px] font-medium">Start Project</p>
              </button>
              <button type="button" className="rounded-xl border border-border/60 px-3 py-3 text-left hover:bg-muted/40 transition-colors">
                <span className="block w-4 h-4 text-amber-500 mb-2" />
                <p className="text-[13px] font-medium">Add Partner</p>
              </button>
              <button type="button" className="rounded-xl border border-border/60 px-3 py-3 text-left hover:bg-muted/40 transition-colors">
                <span className="block w-4 h-4 text-emerald-500 mb-2" />
                <p className="text-[13px] font-medium">Fund Escrow</p>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-border/50 bg-background p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Client Tip</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Define acceptance criteria for each milestone to speed up approvals and reduce disputes.
            </p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-background p-5">
            <h3 className="text-[15px] font-semibold text-foreground">Compliance</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All active projects are currently covered by escrow and verified contributors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
