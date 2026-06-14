import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, ChevronRight, Clock } from "lucide-react";

import type { RoutePath } from "@/types/router";

// Mock Data adapted for Nnarks context
const UPCOMING_EVENTS: { id: number; title: string; desc: string; date: string; image: string; link: RoutePath }[] = [
  {
    id: 1,
    title: "Project Milestone: Backend API",
    desc: "Awaiting your review before escrow release.",
    date: "Tomorrow, 2:00 PM",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    link: "/inbox",
  },
  {
    id: 2,
    title: "Client Meeting: Acme Corp",
    desc: "Discussing project requirements for Phase 2.",
    date: "Friday, 10:00 AM",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop",
    link: "/inbox",
  },
];

const PENDING_EVENTS: { id: number; title: string; desc: string; date: string; urgent: boolean; link: RoutePath }[] = [
  {
    id: 3,
    title: "KYC Verification Needed",
    desc: "Please submit your documents to unlock higher limits.",
    date: "Pending since Yesterday",
    urgent: true,
    link: "/organization",
  },
  {
    id: 4,
    title: "Review Proposal: UI Design",
    desc: "Creative Agency has submitted a new proposal.",
    date: "Pending since 2 hours ago",
    urgent: false,
    link: "/projects",
  },
];


export function DashboardRightPanel() {
  return (
    <div className="h-full flex flex-col bg-slate-50/50 border-l border-border/40 w-80 shrink-0 overflow-y-auto scrollbar-hide">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10">
        <h3 className="text-[15px] font-bold text-foreground">
          Announcements & Events
        </h3>
        <button className="text-xs font-semibold text-primary flex items-center hover:opacity-80 transition-opacity">
          View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      <div className="px-5 pb-8 flex flex-col gap-6">

        {/* Upcoming Section */}
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Calendar className="w-4 h-4 text-primary" />
            Upcoming
          </div>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-xs border border-border/40 overflow-hidden flex flex-col group">
                <div className="h-28 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-white/90 text-black px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {event.date}
                  </span>
                </div>
                <div className="p-3.5 flex flex-col gap-1.5">
                  <h4 className="text-[13px] font-bold text-foreground leading-tight">{event.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{event.desc}</p>

                  <Link
                    to={event.link}
                    className="mt-1 text-[11px] font-semibold text-primary flex items-center group-hover:underline"
                  >
                    Read More <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Section */}
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Clock className="w-4 h-4 text-amber-500" />
            Pending Action
          </div>

          <div className="space-y-3">
            {PENDING_EVENTS.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-xs border border-border/40 p-3.5 flex flex-col gap-2 group hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="text-[13px] font-bold text-foreground leading-tight flex-1 pr-2">{event.title}</h4>
                  {event.urgent && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-destructive mt-1 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{event.desc}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-medium text-muted-foreground/70 bg-muted/40 px-2 py-0.5 rounded">
                    {event.date}
                  </span>
                  <Link
                    to={event.link}
                    className="w-6 h-6 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
