import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ContractorImg from "@/assets/img/landing/contractor.webp";
import DiasporaImg from "@/assets/img/landing/diaspora.webp";
import ContributorsImg from "@/assets/img/landing/contributors.webp";
import { AnnouncementItemCard, type AnnouncementItem } from "./AnnouncementItemCard";

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    date: "Jan 09, 2026",
    title: "Welcome to the Project Hub",
    description:
      "Your client workspace is ready. Track milestones, verify releases, and keep all project communication in one place.",
    image: ContractorImg,
    link: "/projects",
  },
  {
    id: 2,
    date: "Jan 09, 2026",
    title: "Upcoming Release Review",
    description:
      "A new milestone release is pending approval. Review deliverables to keep your project on schedule.",
    image: DiasporaImg,
    link: "/projects/milestones",
  },
  {
    id: 3,
    date: "Jan 09, 2026",
    title: "Invite Your Team Members",
    description:
      "Bring contributors into the workspace so they can view tasks, updates, and progress in real time.",
    image: ContributorsImg,
    link: "/organization/team",
  },
];

export function ClientAnnouncementsPanel() {
  return (
    <aside className="h-full flex flex-col bg-background border-l border-border/40 w-80 shrink-0 overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-background/95  backdrop-blur-sm z-10 border-b border-border/40">
        <div>
          <h3 className="text-[15px] font-bold text-foreground">Announcements</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Latest client updates</p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-primary flex items-center hover:opacity-80 transition-opacity"
        >
          View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      <div className="px-5 pb-6 pt-5 flex flex-col gap-4">
        {ANNOUNCEMENTS.map((announcement) => (
          <AnnouncementItemCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </aside>
  );
}
