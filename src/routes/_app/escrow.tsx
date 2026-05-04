import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionDivider, StatusBadge, MetricCard } from "@/components/app/shared";
import { MOCK_ACTIVE_ESCROW, MOCK_ESCROW_SUMMARY, MOCK_RELEASED_ESCROW } from "@/data/mock/escrow";

export const Route = createFileRoute("/_app/escrow")({
  component: EscrowPage,
});

function EscrowPage() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto px-6 py-8 animate-in fade-in duration-500">
      <PageHeader title="Escrow" subtitle="Overview of your protected funds" />

      {/* Summary View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-border/60 pb-8">
        <MetricCard
          label="Total in escrow"
          value={`$${MOCK_ESCROW_SUMMARY.totalInEscrow.toLocaleString()}`}
          dotColor="bg-primary"
          className="p-0"
        />
        <MetricCard
          label="Released (30d)"
          value={`$${MOCK_ESCROW_SUMMARY.releasedLast30d.toLocaleString()}`}
          valueColor="text-success"
          className="p-0"
        />
        <MetricCard
          label="Pending release"
          value={`$${MOCK_ESCROW_SUMMARY.pendingRelease.toLocaleString()}`}
          valueColor="text-warning"
          className="p-0"
        />
      </div>

      {/* Active escrow */}
      <section>
        <SectionDivider label="Active escrow" className="mb-6" />
        <div className="flex flex-col text-[15px]">
          {MOCK_ACTIVE_ESCROW.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center px-4 py-3 rounded-md hover:bg-muted/40 transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground">{entry.projectName}</span>
                <span className="text-[13px] text-muted-foreground">{entry.milestone}</span>
              </div>
              <div className="font-geist font-medium text-foreground">
                ${entry.amount.toLocaleString()}
              </div>
              <div className="flex items-center">
                <StatusBadge status={entry.status === "In progress" ? "IN_PROGRESS" : "UNDER_REVIEW"} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently released */}
      <section>
        <SectionDivider label="Recently released" className="mb-6" />
        <div className="flex flex-col text-[15px]">
          {MOCK_RELEASED_ESCROW.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center px-4 py-3 rounded-md hover:bg-muted/40 transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground">{entry.projectName}</span>
                <span className="text-[13px] text-muted-foreground">{entry.milestone}</span>
              </div>
              <div className="font-geist font-medium text-foreground">
                ${entry.amount.toLocaleString()}
              </div>
              <div className="font-medium text-success text-[14px]">
                Released {entry.releaseDate}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
