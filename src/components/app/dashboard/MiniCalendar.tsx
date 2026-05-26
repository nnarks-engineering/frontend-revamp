import { cn } from "@/shared/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun, shift to Mon-based (0=Mon)
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

interface MiniCalendarProps {
  className?: string;
  /** Highlight these dates (ISO strings) */
  highlightedDates?: string[];
}

export function MiniCalendar({ className, highlightedDates = [] }: MiniCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const highlighted = new Set(
    highlightedDates
      .map((d) => new Date(d))
      .filter((d) => d.getFullYear() === year && d.getMonth() === month)
      .map((d) => d.getDate())
  );

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // pad to complete grid rows
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number | null) =>
    day !== null &&
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  return (
    <div className={cn("bg-background rounded-lg 0 p-5 select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
        type="button"
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="text-[14px] font-bold text-foreground">
          {MONTHS[month]} {year}
        </h3>

        <button
        type="button"
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          const isTodayDay = isToday(day);
          const isHighlighted = day !== null && highlighted.has(day);

          return (
            <div
              key={day ?? `empty-${idx}`} 
              className={cn(
                "h-8 flex items-center justify-center rounded-md text-[12.5px] font-medium transition-colors",
                day === null && "invisible",
                isTodayDay
                  ? "bg-primary-600 text-white font-bold"
                  : isHighlighted
                  ? "bg-primary/10 text-primary-600 font-semibold ring-1 ring-primary/20"
                  : "text-foreground hover:bg-muted/50 cursor-pointer"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {highlightedDates.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/10 ring-1 ring-primary/30" />
          <span className="text-[11px] text-muted-foreground">Scheduled events</span>
        </div>
      )}
    </div>
  );
}
