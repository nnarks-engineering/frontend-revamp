/**
 * WeatherWidget — shows live weather for the user's location.
 *
 * Data: Open-Meteo (free, no API key) + Nominatim reverse-geocoding.
 * Animation: Framer Motion animated SVG icons per weather condition.
 */

import { motion } from "framer-motion";
import { Droplets, MapPin, Wind } from "lucide-react";

import { useLocationPreference } from "@/shared/hooks/use-location-preference";
import { useWeather, type WeatherCondition } from "@/shared/hooks/use-weather";
import { cn } from "@/shared/lib/utils";

// ─── Animated weather icons ────────────────────────────────────────────────────

/** Shared cloud path used by several icons */
function Cloud({
  cx = 40,
  cy = 46,
  scale = 1,
  fill = "white",
  opacity = 1,
}: {
  cx?: number;
  cy?: number;
  scale?: number;
  fill?: string;
  opacity?: number;
}) {
  const s = scale;
  return (
    <g transform={`translate(${cx - 40 * s}, ${cy - 46 * s}) scale(${s})`} opacity={opacity}>
      <circle cx="26" cy="50" r="12" fill={fill} />
      <circle cx="40" cy="42" r="16" fill={fill} />
      <circle cx="54" cy="50" r="12" fill={fill} />
      <rect x="14" y="50" width="52" height="14" rx="7" fill={fill} />
    </g>
  );
}

// ── Clear Day ──────────────────────────────────────────────────────────────────
function ClearDayIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      {/* Rotating rays */}
      <motion.g
        style={{ originX: "40px", originY: "40px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x="38" y="3"
            width="4" height="13"
            rx="2"
            fill="#FCD34D"
            transform={`rotate(${i * 45}, 40, 40)`}
          />
        ))}
      </motion.g>
      {/* Glow halo */}
      <motion.circle
        cx="40" cy="40" r="20"
        fill="#FDE68A"
        animate={{ r: [20, 23, 20], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sun core */}
      <circle cx="40" cy="40" r="16" fill="#F59E0B" />
      <circle cx="34" cy="34" r="5" fill="#FDE68A" opacity="0.45" />
    </svg>
  );
}

// ── Clear Night ────────────────────────────────────────────────────────────────
function ClearNightIcon() {
  const stars = [
    { x: 62, y: 14, r: 2.5, delay: 0 },
    { x: 70, y: 30, r: 1.8, delay: 0.6 },
    { x: 56, y: 22, r: 1.4, delay: 1.1 },
    { x: 68, y: 48, r: 2,   delay: 0.3 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <defs>
        <mask id="crescent">
          <rect width="80" height="80" fill="white" />
          <circle cx="51" cy="30" r="22" fill="black" />
        </mask>
      </defs>
      <motion.circle
        cx="37" cy="42" r="26"
        fill="#FDE68A"
        mask="url(#crescent)"
        animate={{ opacity: [1, 0.82, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x} cy={s.y} r={s.r}
          fill="#FDE68A"
          animate={{ opacity: [1, 0.1, 1], r: [s.r, s.r * 1.3, s.r] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

// ── Partly Cloudy Day ──────────────────────────────────────────────────────────
function PartlyCloudyDayIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      {/* Sun (partially hidden) */}
      <motion.g
        style={{ originX: "28px", originY: "28px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x="26.5" y="3"
            width="3" height="10"
            rx="1.5"
            fill="#FCD34D"
            transform={`rotate(${i * 45}, 28, 28)`}
          />
        ))}
      </motion.g>
      <circle cx="28" cy="28" r="12" fill="#F59E0B" />
      {/* Floating cloud over sun */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={46} cy={52} scale={0.9} fill="white" />
        <Cloud cx={46} cy={52} scale={0.88} fill="#F1F5F9" opacity={0.6} />
      </motion.g>
    </svg>
  );
}

// ── Partly Cloudy Night ────────────────────────────────────────────────────────
function PartlyCloudyNightIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <defs>
        <mask id="crescent-sm">
          <rect width="80" height="80" fill="white" />
          <circle cx="38" cy="24" r="16" fill="black" />
        </mask>
      </defs>
      <circle cx="28" cy="28" r="20" fill="#FDE68A" mask="url(#crescent-sm)" opacity="0.9" />
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={46} cy={52} scale={0.9} fill="white" />
      </motion.g>
    </svg>
  );
}

// ── Cloudy ─────────────────────────────────────────────────────────────────────
function CloudyIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {/* Back cloud */}
      <motion.g
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={44} cy={46} scale={0.82} fill="#CBD5E1" opacity={0.7} />
      </motion.g>
      {/* Front cloud */}
      <motion.g
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Cloud cx={38} cy={50} scale={0.92} fill="white" />
      </motion.g>
    </svg>
  );
}

// ── Fog ────────────────────────────────────────────────────────────────────────
function FogIcon() {
  const lines = [
    { y: 28, w: 52, delay: 0 },
    { y: 40, w: 44, delay: 0.4 },
    { y: 52, w: 52, delay: 0.8 },
    { y: 64, w: 36, delay: 1.2 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {lines.map((l, i) => (
        <motion.rect
          key={i}
          x={(80 - l.w) / 2}
          y={l.y - 3}
          width={l.w}
          height={5}
          rx="2.5"
          fill="#94A3B8"
          animate={{ x: [0, 6, 0, -6, 0], opacity: [0.7, 1, 0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, delay: l.delay, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

// ── Drizzle ────────────────────────────────────────────────────────────────────
function DrizzleIcon() {
  const drops = [
    { x: 24, delay: 0 },
    { x: 36, delay: 0.3 },
    { x: 48, delay: 0.15 },
    { x: 56, delay: 0.45 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={40} cy={34} scale={0.78} fill="#E2E8F0" />
      </motion.g>
      {drops.map((d, i) => (
        <motion.line
          key={i}
          x1={d.x} y1={56}
          x2={d.x - 2} y2={64}
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: d.delay, ease: "easeIn" }}
        />
      ))}
    </svg>
  );
}

// ── Rain ───────────────────────────────────────────────────────────────────────
function RainIcon() {
  const drops = [
    { x: 20, delay: 0 },
    { x: 30, delay: 0.2 },
    { x: 40, delay: 0.4 },
    { x: 50, delay: 0.1 },
    { x: 60, delay: 0.3 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={40} cy={30} scale={0.82} fill="#94A3B8" />
      </motion.g>
      {drops.map((d, i) => (
        <motion.line
          key={i}
          x1={d.x} y1={52}
          x2={d.x - 4} y2={66}
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: d.delay, ease: "easeIn" }}
        />
      ))}
    </svg>
  );
}

// ── Snow ───────────────────────────────────────────────────────────────────────
function SnowIcon() {
  const flakes = [
    { x: 22, delay: 0 },
    { x: 34, delay: 0.4 },
    { x: 46, delay: 0.2 },
    { x: 58, delay: 0.6 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={40} cy={30} scale={0.82} fill="#CBD5E1" />
      </motion.g>
      {flakes.map((f, i) => (
        <motion.text
          key={i}
          x={f.x} y={56}
          fontSize="12"
          textAnchor="middle"
          fill="#BAE6FD"
          animate={{ y: [0, 14, 0], rotate: [0, 180, 360], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
        >
          ❄
        </motion.text>
      ))}
    </svg>
  );
}

// ── Thunderstorm ───────────────────────────────────────────────────────────────
function ThunderstormIcon() {
  const drops = [
    { x: 22, delay: 0.1 },
    { x: 58, delay: 0.3 },
  ];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud cx={40} cy={28} scale={0.85} fill="#64748B" />
      </motion.g>
      {/* Lightning bolt */}
      <motion.path
        d="M 44 46 L 36 58 L 42 58 L 36 72 L 48 56 L 42 56 Z"
        fill="#FDE047"
        animate={{ opacity: [1, 0.1, 1, 0.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], ease: "easeInOut" }}
      />
      {drops.map((d, i) => (
        <motion.line
          key={i}
          x1={d.x} y1={50}
          x2={d.x - 4} y2={64}
          stroke="#93C5FD"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: d.delay, ease: "easeIn" }}
        />
      ))}
    </svg>
  );
}

// ─── Icon resolver ─────────────────────────────────────────────────────────────

function WeatherIcon({ condition }: { condition: WeatherCondition }) {
  switch (condition) {
    case "clear-day":           return <ClearDayIcon />;
    case "clear-night":         return <ClearNightIcon />;
    case "partly-cloudy-day":   return <PartlyCloudyDayIcon />;
    case "partly-cloudy-night": return <PartlyCloudyNightIcon />;
    case "cloudy":              return <CloudyIcon />;
    case "fog":                 return <FogIcon />;
    case "drizzle":             return <DrizzleIcon />;
    case "rain":                return <RainIcon />;
    case "snow":                return <SnowIcon />;
    case "thunderstorm":        return <ThunderstormIcon />;
  }
}

// ─── Background gradient per condition ────────────────────────────────────────

function conditionGradient(condition: WeatherCondition): string {
  switch (condition) {
    case "clear-day":           return "from-amber-50 to-sky-100";
    case "clear-night":         return "from-indigo-950 to-slate-900";
    case "partly-cloudy-day":   return "from-sky-50 to-blue-100";
    case "partly-cloudy-night": return "from-indigo-900 to-slate-800";
    case "cloudy":              return "from-slate-100 to-slate-200";
    case "fog":                 return "from-slate-200 to-slate-300";
    case "drizzle":             return "from-primary-50 to-primary-100";
    case "rain":                return "from-blue-100 to-slate-200";
    case "snow":                return "from-sky-50 to-blue-50";
    case "thunderstorm":        return "from-slate-700 to-slate-900";
  }
}

function isNightCondition(condition: WeatherCondition): boolean {
  return condition === "clear-night" || condition === "partly-cloudy-night";
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function WeatherSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-border/50 px-5 py-4 min-w-[260px] animate-pulse">
      <div className="w-16 h-16 rounded-full bg-muted shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-6 w-14 rounded bg-muted" />
        <div className="h-3 w-28 rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface WeatherWidgetProps {
  className?: string;
}

export function WeatherWidget({ className }: WeatherWidgetProps) {
  const { location, status, grant } = useLocationPreference();
  const { data, isLoading, isError } = useWeather(location);

  if (isLoading) return <WeatherSkeleton />;

  if (isError) {
    return (
      <div className={cn(
        "flex items-center gap-3 bg-white rounded-2xl border border-border/50 px-5 py-4 min-w-[220px]",
        className,
      )}>
        <span className="text-2xl">🌡️</span>
        <span className="text-[13px] text-muted-foreground">Weather unavailable</span>
      </div>
    );
  }

  if (!data) return null;

  const night = isNightCondition(data.condition);
  const textPrimary   = night ? "text-white"           : "text-foreground";
  const textSecondary = night ? "text-white/70"        : "text-muted-foreground";
  const border        = night ? "border-white/10"      : "border-border/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden px-5 py-4",
        "bg-gradient-to-br min-w-[260px]",
        conditionGradient(data.condition),
        border,
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {/* Animated icon */}
        <div className="w-16 h-16 shrink-0">
          <WeatherIcon condition={data.condition} />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5 min-w-0">
          {/* Location */}
          <div className="flex items-center gap-1">
            <MapPin className={cn("w-3 h-3 shrink-0", textSecondary)} />
            <span className={cn("text-[11px] font-medium truncate", textSecondary)}>
              {data.locationName}
            </span>
            {(status === "denied" || status === "browser-blocked") && (
              <button
                onClick={grant}
                title={
                  status === "browser-blocked"
                    ? "Location blocked — click to see how to enable"
                    : "Enable your location"
                }
                className={cn(
                  "ml-1 text-[10px] font-semibold underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity shrink-0",
                  textSecondary,
                )}
              >
                Enable
              </button>
            )}
          </div>

          {/* Temperature */}
          <div className="flex items-end gap-1.5">
            <span className={cn("text-[28px] font-bold leading-none tracking-tight", textPrimary)}>
              {data.temperature}°
            </span>
            <span className={cn("text-[12px] pb-1", textSecondary)}>
              Feels {data.feelsLike}°
            </span>
          </div>

          {/* Condition label */}
          <span className={cn("text-[12px] font-medium", textPrimary)}>
            {data.conditionText}
          </span>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Droplets className={cn("w-3 h-3", textSecondary)} />
              <span className={cn("text-[11px]", textSecondary)}>{data.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className={cn("w-3 h-3", textSecondary)} />
              <span className={cn("text-[11px]", textSecondary)}>{data.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
