import { format } from "date-fns";

import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { WeatherWidget } from "@/components/app/shared";
import { Card, CardHeader } from "@/components/ui/card";
import { useCurrentProfile } from "@/shared/hooks/auth/use-auth";

export function WelcomeBanner() {
  const { data: profile } = useCurrentProfile();
  
  const today = new Date();
  const dateFormatted = format(today, "EEEE, do MMM, yyyy");
  const timeFormatted = format(today, "h:mm a 'GMT'"); // Using string 'GMT' to mock timezone as shown in image

  return (
    <Card className=" flex flex-col @min-lg:flex-row items-stretch overflow-clip justify-between p-0 px-0!">
      <CardHeader className="flex-1 relative  overflow-clip bg-primary-100">
        <RoundingLine className="absolute z-0 -top-3 left-0 text-primary-50  " />
        <div className="relative z-2"> <div className="flex flex-col gap-1 mb-4 sm:mb-6">
          <p className="text-sm font-semibold text-foreground/80">{dateFormatted}</p>
          <p className="text-xs text-muted-foreground">{timeFormatted}</p>
        </div>
        <h1 className="text-2xl md:text-3xl font-millik text-foreground font-bold tracking-tight mb-2">
          Hi {profile?.first_name ? profile.first_name : "there"},
        </h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your activities
        </p></div>
       
      </CardHeader>

      <div className="shrink-0 flex items-center justify-center self-start sm:self-center">
        <div className=" origin-right">
          <WeatherWidget />
        </div>
      </div>
    </Card>
  );
}
