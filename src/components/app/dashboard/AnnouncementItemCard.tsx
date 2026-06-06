import { Link } from "@tanstack/react-router";

export interface AnnouncementItem {
  readonly id: number;
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly link: string;
}

interface AnnouncementItemCardProps {
  readonly announcement: AnnouncementItem;
}

export function AnnouncementItemCard({ announcement }: AnnouncementItemCardProps) {
  return (
    <article className="rounded-xl border- border-background-space! p-4 bg-background-space overflow-hidden group cursor-pointer transition-colors">
      <Link
        to={announcement.link as never}
        className="block"
      >
        <div className="relative overflow-hidden rounded-xl bg-muted/20">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="pt-3 space-y-2">
          <p className="text-[12px] text-tertiary-fg-hover">{announcement.date}</p>
          <h4 className="text-[17px] font-semibold text-foreground leading-snug font-millik">
            {announcement.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {announcement.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
