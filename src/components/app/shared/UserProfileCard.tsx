import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

interface UserProfileCardProps {
  readonly name: string;
  readonly handle?: string;
  readonly avatarUrl?: string;
  readonly className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserProfileCard({ name, handle, avatarUrl, className }: UserProfileCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-white px-6 py-6 shadow-xs",
        className,
      )}
    >
      {/* Avatar with halo ring */}
      <div className="rounded-full bg-primary-50">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl ?? ""} alt={name} />
          <AvatarFallback className="bg-primary-100 text-base font-semibold text-foreground/70">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name & handle */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        {handle && (
          <span className="text-xs text-muted-foreground">
            {handle.startsWith("@") ? handle : `@${handle}`}
          </span>
        )}
      </div>
    </div>
  );
}
