import { Card } from "@/components/ui/card";
import TeamIllustration from "@/assets/svg/no-message.svg?react";
import { cn } from "@/shared/lib/utils";
import { MessageSquare, ChevronRight, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/image/Image";
import { useCompanyMembers } from "@/shared/hooks/use-company-members";
import { useActiveCompany } from "@/shared/contexts/active-company-context";
import { useMyCompanies } from "@/shared/hooks/use-companies";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

interface TeamActionCardProps {
  className?: string;
}

export function TeamActionCard({ className }: TeamActionCardProps) {
  const { data: companies = [] } = useMyCompanies();
  const { activeCompanyId } = useActiveCompany();

  const activeCompany = useMemo(
    () => companies.find((c) => c.id === activeCompanyId) ?? companies[0] ?? null,
    [companies, activeCompanyId],
  );

  const { data: members = [], isLoading } = useCompanyMembers(activeCompany?.id);

  const activeMembers = members.filter((m) => m.status === "active");
  const pendingCount = members.filter((m) => m.status === "pending").length;
  const totalCount = members.length;

  // Show up to 4 avatars from active members
  const displayMembers = activeMembers.slice(0, 4);
  const overflow = activeMembers.length - displayMembers.length;

  return (
    <Card className={cn(
      "min-w-xs overflow-hidden @max-2xl:row-start-2 @max-2xl:col-span-2 flex flex-1 flex-col p-0! border-border/40 shadow-xs",
      className,
    )}>

      {/* ── Banner ── */}
      <div className="h-24 bg-primary-bg relative overflow-hidden shrink-0">
        <TeamIllustration className="absolute bottom-0 right-3 h-20 w-auto opacity-90" />
        <div className="absolute top-4 left-5">
          <p className="text-sm font-semibold text-primary-fg leading-tight font-millik text-xl">Your Team</p>
          <p className="text-xs text-primary-fg-hover mt-0.5">Collaborate &amp; connect</p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 flex flex-col gap-3">

        {/* ── Avatar Stack + CTA ── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="size-5 text-muted-foreground animate-spin" />
          </div>
        ) : totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-3 gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">No team members yet</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Invite people to start collaborating.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            {/* Overlapping avatars */}
            <div className="flex items-center flex-1">
              {displayMembers.map((m) => {
                // Derive a display name from the email
                const displayName = m.email
                  .split("@")[0]
                  .replace(/[._-]/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());

                return (
                  <div
                    key={m.id}
                    className={cn(
                      "rounded-full border-2 border-background size-7 shrink-0 not-last:-ml-2",
                    )}
                  >
                    <Image
                      src={null}
                      alt={displayName}
                      fullName={displayName}
                      className="size-full rounded-full"
                    />
                  </div>
                );
              })}

              {/* Overflow badge */}
              {overflow > 0 && (
                <div className={cn(
                  "size-7 -ml-2 shrink-0 rounded-full",
                  "border border-dashed border-muted-foreground/40 bg-muted",
                  "flex items-center justify-center text-[10px] text-muted-foreground font-medium"
                )}>
                  +{overflow}
                </div>
              )}

              <span className="text-xs text-muted-foreground ml-2.5">
                {activeMembers.length} active
                {pendingCount > 0 ? ` · ${pendingCount} pending` : ""}
              </span>
            </div>

            <Link to={"/organization/team" as any}>
              <Button variant="primary" size="sm">
                New member
              </Button>
            </Link>
          </div>
        )}

        <hr className="border-border/40" />

        {/* ── Actions ── */}
        <div className="flex flex-col gap-2.5">
          <ActionRow
            icon={<MessageSquare className="size-4" />}
            iconClass="bg-primary/10 text-primary"
            label="Message team"
            sublabel="Send a broadcast or DM"
            to={"/inbox" as any}
          />
        </div>

      </div>
    </Card>
  );
}

function ActionRow({
  icon,
  iconClass,
  label,
  sublabel,
  to,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  sublabel: string;
  to?: string;
}) {
  const content = (
    <>
      <div className={cn("h-full w-9 bg-primary flex items-center justify-center shrink-0", iconClass)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0 py-2.5">
        <p className="text-sm font-semibold text-primary-fg font-millik">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 text-primary-fg-hover">{sublabel}</p>
      </div>
      <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
    </>
  );

  if (to) {
    return (
      <Link
        to={to as any}
      className="flex items-center overflow-hidden  gap-3 px-3.5  pl-0 rounded-xl border border-dashed border-background-space hover:bg-muted/50 transition-colors text-left w-full group"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
    onClick={() => {

    }}
      type="button"
      className="flex items-center overflow-hidden  gap-3 px-3.5  pl-0 rounded-xl border border-dashed border-background-space hover:bg-muted/50 transition-colors text-left w-full group"
    >
      {content}
    </button>
  );
}
