import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/app/shared";
import { Button } from "@/components/ui/button";
import { MOCK_TRUST_CIRCLES } from "@/data/mock/trust-circles";

export const Route = createFileRoute("/_app/circles/")({
  component: TrustCirclesPage,
});

function TrustCirclesPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <PageHeader
        title="Trust Circles"
        subtitle="Manage your collaborative escrow pools"
      >
        <Button variant="default">+ Create Trust Circle</Button>
      </PageHeader>

      {/* List Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] text-[13px] font-medium tracking-wider uppercase text-muted-foreground border-b border-border/60 px-4 pb-2">
        <div>Circle Name</div>
        <div>Members</div>
        <div>Pooled</div>
        <div>Status</div>
      </div>

      {/* List Body */}
      <div className="flex flex-col text-[15px]">
        {MOCK_TRUST_CIRCLES.map((circle) => (
          <Link
            key={circle.id}
            to="/circles"
            className="group grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center px-4 py-3 rounded-md hover:bg-muted/40 transition-colors"
          >
            <div className="font-medium text-foreground">{circle.name}</div>
            <div className="text-muted-foreground">{circle.members}</div>
            <div className="font-geist font-medium text-foreground">
              ${circle.pooled.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={circle.status === "Active" ? "ACTIVE" : "PENDING"} />
              {circle.voteOpen && (
                <span className="text-[13px] text-muted-foreground">· vote open</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
