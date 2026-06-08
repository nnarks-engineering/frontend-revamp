import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import RoundingLine2 from "@/assets/svg/rounding-line2.svg?react";

export interface UserListItem {
  readonly id: string;
  readonly name: string;
  readonly handle?: string;
  readonly avatarUrl?: string;
}

interface UserListCardProps {
  readonly title: string;
  readonly users: readonly UserListItem[];
  readonly href?: string;
  readonly onViewMore?: () => void;
  readonly className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserListCard({ title, users, href, onViewMore, className }: UserListCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden bg-background flex flex-col p-4 @md:p-0",
        className,
      )}
    >
      <CardHeader
        decoration={RoundingLine2}
        decorationClassName="absolute  -top-3 left-0 text-primary-bg-hover pointer-events-none "
        className="relative overflow-clip pb-3 bg-primary-bg"
      >
        <h3 className="text-base font-bold text-foreground">{title}</h3>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5 pb-4 pt-0">
        <ul className="flex flex-col gap-3 py-2">
          {users.map((user) => (
            <li key={user.id} className="flex items-center gap-3">
              <div className="shrink-0 rounded-full">
                <Avatar className="size-9">
                  <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                  <AvatarFallback className="bg-slate-100 text-xs font-semibold text-foreground/70">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="min-w-0 flex flex-col">
                <span className="truncate text-sm font-semibold text-foreground leading-tight">
                  {user.name}
                </span>
                {user.handle && (
                  <span className="truncate text-xs text-muted-foreground">
                    {user.handle.startsWith("@") ? user.handle : `@${user.handle}`}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Footer button */}
      {href && (
        <Link
          to={href}
          className="mt-auto flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          View More
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
      {!href && onViewMore && (
        <button
          type="button"
          onClick={onViewMore}
          className="mt-auto flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          View More
          <ArrowRight className="size-4" aria-hidden />
        </button>
      )}
    </Card>
  );
}
