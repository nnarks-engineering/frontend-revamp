import { BadgeCheck, Edit2 } from "lucide-react";

import RoundingLine from "@/assets/svg/rounding-line.svg?react";
import { Image } from "@/components/image/Image";
import { Card } from "@/components/ui/card";
import { useCurrentProfile } from "@/shared/hooks/use-auth";
import { cn, getColorClass } from '@/shared/lib/utils';


function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function UserProfileCard() {
  const { data: profile } = useCurrentProfile();

  const fullName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");

  const firstName = profile?.first_name || "There";
  const location = profile?.country ? profile.country : "";

  return (
    <Card className="w-full max-w-xs overflow-hidden flex flex-col p-0! border-border/40 shadow-xs">
      {/* ── Banner Section ── */}
      <div className="h-24 bg-tertiary relative overflow-hidden shrink-0">
        <RoundingLine className="absolute z-0 -top-6 left-0 text-tertiary-400 opacity-50 scale-x-[-1]" />
      </div>

      <div className="px-5 pb-6 relative flex flex-col flex-1">
        {/* ── Avatar Section ── */}
        <div className="relative -mt-10 mb-3 self-start">
          <div className="p-1 rounded-full size-22 border border-dashed border-muted-foreground/40 bg-background">
            <Image
              src={profile?.avatar}
              alt={fullName || "User"}
              fullName={fullName}
              className="h-20 w-20 rounded-full border-4 border-background shadow-sm"
            />
          </div>
          {/* Add Button */}
          <button
            type="button"
            className={cn("absolute bottom-1 right-1 h-7 w-7", getColorClass(fullName), "text-white rounded-full border-2 border-background flex items-center justify-center  hover:opacity-80 hover:shadow backdrop-blur-sm transition-colors")}
          >
            <Edit2 className="size-3" />
          </button>
        </div>

        {/* ── Profile Info ── */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-millik font-bold text-foreground">
              {getGreeting()}, {firstName}
            </h2>
            <BadgeCheck className="w-5 h-5 text-foreground/80" />
          </div>

          <p className="text-sm text-foreground">--</p>

          {location && (
            <p className="text-sm text-muted-foreground mt-1">
              {location}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
