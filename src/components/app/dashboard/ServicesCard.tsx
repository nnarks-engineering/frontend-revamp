import ServiceIllustrationSvg from "@/assets/svg/service-illustration.svg?react";
import { cn } from "@/shared/lib/utils";

interface ServiceSlideCardProps {
  title: string;
  description: string;
  positionText: string | number;
  category?: string | null;
  status?: { bg: string; color: string; icon: React.ReactNode; label: string };
  isLast?: boolean;
  onClick: () => void;
  actionContent?: React.ReactNode;
}

export function ServiceSlideCard({
  title,
  description,
  positionText,
  category,
  status,
  isLast,
  onClick,
  actionContent,
}: ServiceSlideCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full sm:min-w-lg md:min-w-xl flex items-center gap-3 md:gap-0 py-4 cursor-pointer transition-colors group",
      )}
    >
      {/* ── Illustration — md+ only ──────────────────────────────── */}
      <div className="hidden md:flex relative max-h-64 shrink-0 items-center justify-center">
        <span className="absolute right-0 flex items-end text-primary-600 justify-center text-[150px] font-millik font-black select-none leading-none">
          {positionText}
        </span>
        <ServiceIllustrationSvg className="size-52 -mr-20 relative opacity-90" />
      </div>

      {/* ── Content card ─────────────────────────────────────────── */}
      <div className="flex-1 relative min-w-0 flex flex-col gap-1 border border-primary-900/20 md:rounded-r-lg bg-amber-50 overflow-hidden p-3">

        {/* Watermark illustration — mobile/tablet only, hidden on md+ */}
        <ServiceIllustrationSvg
          aria-hidden="true"
          className="md:hidden pointer-events-none select-none absolute right-0 -bottom-4 size-32 sm:size-40 opacity-[0.06]"
        />

        {/* Watermark number — mobile/tablet only */}
        <span
          aria-hidden="true"
          className="md:hidden pointer-events-none select-none absolute -right-3 -bottom-4 text-[100px] sm:text-[120px] font-millik font-black leading-none text-primary-600/10"
        >
          {positionText}
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-1">
          <h4 className="text-base md:text-xl font-millik font-bold text-primary-900 leading-tight truncate">
            {title}
          </h4>
          <p className="text-[11px] md:text-[11.5px] text-primary-700 line-clamp-2">
            {description}
          </p>

          {category && (
            <div className="flex flex-wrap gap-1 mt-0.5">
              {category.split(",").map((cat) => (
                <span
                  key={cat}
                  className="inline-block text-[10px] font-semibold bg-primary-600/10 text-primary-600 px-2 py-1 rounded-sm"
                >
                  {cat.trim()}
                </span>
              ))}
            </div>
          )}

          {status && (
            <div
              className={cn(
                "mt-1 w-fit flex items-center gap-1 rounded-full py-0.5 text-[10px] font-semibold",
                status.color,
              )}
            >
              {status.icon}
              {status.label}
            </div>
          )}

          {actionContent && <div className="mt-2">{actionContent}</div>}
        </div>
      </div>

      {!isLast && (
        <div className="ml-2 md:ml-4 opacity-20 size-6 md:size-10 rounded-full bg-primary-900 shrink-0" />
      )}
    </div>
  );
}