import { WeatherWidget } from "@/components/app/shared";
import { useCurrentProfile } from "@/shared/hooks/use-auth";
import { format } from "date-fns";

export function WelcomeBanner() {
  const { data: profile } = useCurrentProfile();
  
  const today = new Date();
  const dateFormatted = format(today, "EEEE, do MMM, yyyy");
  const timeFormatted = format(today, "h:mm a 'GMT'"); // Using string 'GMT' to mock timezone as shown in image

  return (
    <div className="bg-white rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-5 md:p-6 shadow-xs border border-border/40 gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-1 mb-4 sm:mb-6">
          <p className="text-sm font-semibold text-foreground/80">{dateFormatted}</p>
          <p className="text-xs text-muted-foreground">{timeFormatted}</p>
        </div>
        <h1 className="text-2xl md:text-3xl font-millik text-foreground font-bold tracking-tight mb-2">
          Hi {profile?.first_name ? profile.first_name : "there"},
        </h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your activities
        </p>
      </div>

      <div className="shrink-0 flex items-center justify-center self-start sm:self-center">
        <div className="scale-125 origin-right">
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}
