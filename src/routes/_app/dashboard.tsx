import { WeatherWidget } from "@/components/app/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto font-outfit">
      {/* Welcome Section */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Welcome back 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        <WeatherWidget />
      </div>
    </div>
  );
}
