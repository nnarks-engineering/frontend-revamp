import { cn } from "@/shared/lib/utils";
import { ArrowLeft, ArrowRight, Megaphone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AnnouncementItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  cta: string;
  eta: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    badge: "Operations",
    title: "Scheduled maintenance window",
    description:
      "Escrow reconciliation services will run Sunday 2:00 AM - 3:30 AM UTC. Transactions remain safe; dashboard updates may be delayed.",
    cta: "Review checklist",
    eta: "Updated 2h ago",
  },
  {
    id: 2,
    badge: "Growth",
    title: "New vendor spotlight placements",
    description:
      "Verified vendor profiles now get priority visibility in discovery feeds. Complete your evidence profile to qualify.",
    cta: "Complete profile",
    eta: "Published today",
  },
  {
    id: 3,
    badge: "Security",
    title: "Multi-signature approvals enabled",
    description:
      "Large disbursements can now require two approvers. Configure approval thresholds in Organization Billing.",
    cta: "Set threshold",
    eta: "Published yesterday",
  },
];

export function VendorAnnouncementsSliderPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const active = ANNOUNCEMENTS[index];

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <aside className="h-full flex flex-col bg-background border-l border-border/40 w-80 shrink-0">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/40 shrink-0">
        <div>
          <h3 className="text-[13.5px] font-semibold text-foreground">Announcements</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Vendor updates and rollouts</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            className="w-7 h-7 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Previous announcement"
          >
            <ArrowLeft className="w-3.5 h-3.5 mx-auto" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="w-7 h-7 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Next announcement"
          >
            <ArrowRight className="w-3.5 h-3.5 mx-auto" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-3">
        <div className="h-full rounded-2xl border border-border/50 bg-background-space p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
              <Megaphone className="w-3 h-3" />
              {active.badge}
            </span>
            <span className="text-[10.5px] text-muted-foreground">{active.eta}</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-[15px] font-semibold text-foreground leading-snug">{active.title}</h4>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">{active.description}</p>
          </div>

          <div className="mt-auto pt-4 space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary text-primary-foreground text-[12.5px] font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {active.cta}
            </button>

            <div className="flex items-center justify-center gap-1.5">
              {ANNOUNCEMENTS.map((item, dotIndex) => (
                <span
                  key={item.id}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    dotIndex === index ? "w-5 bg-primary" : "w-1.5 bg-border",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
