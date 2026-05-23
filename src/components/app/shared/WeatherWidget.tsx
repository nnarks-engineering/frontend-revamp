/**
 * WeatherWidget — shows live weather for the user's location.
 *
 * Data: Open-Meteo (free, no API key) + Nominatim reverse-geocoding.
 * Icons: Meteocons animated SVGs via @meteocons/svg (https://meteocons.com)
 */

import { motion } from "framer-motion";
import { Droplets, MapPin, Wind } from "lucide-react";

// ─── Meteocons static imports ─────────────────────────────────────────────────
// All 10 condition icons imported at build time — no dynamic imports, no effects.
// Swap "fill" → "flat" | "line" | "monochrome" to change the icon style.
import clearDaySvg from "@meteocons/svg/fill/clear-day.svg";
import clearNightSvg from "@meteocons/svg/fill/clear-night.svg";
import drizzleSvg from "@meteocons/svg/fill/drizzle.svg";
import fogSvg from "@meteocons/svg/fill/fog.svg";
import overcastSvg from "@meteocons/svg/fill/overcast.svg";
import partlyCloudyDaySvg from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyCloudyNightSvg from "@meteocons/svg/fill/partly-cloudy-night.svg";
import rainSvg from "@meteocons/svg/fill/rain.svg";
import snowSvg from "@meteocons/svg/fill/snow.svg";
import thunderstormsSvg from "@meteocons/svg/fill/thunderstorms-rain.svg";

import { useLocationPreference } from "@/shared/hooks/use-location-preference";
import { useWeather, type WeatherCondition } from "@/shared/hooks/use-weather";
import { cn } from "@/shared/lib/utils";

// ─── Condition → SVG asset map ────────────────────────────────────────────────

const CONDITION_SVG: Record<WeatherCondition, string> = {
  "clear-day":           clearDaySvg,
  "clear-night":         clearNightSvg,
  "partly-cloudy-day":   partlyCloudyDaySvg,
  "partly-cloudy-night": partlyCloudyNightSvg,
  "cloudy":              overcastSvg,
  "fog":                 fogSvg,
  "drizzle":             drizzleSvg,
  "rain":                rainSvg,
  "snow":                snowSvg,
  "thunderstorm":        thunderstormsSvg,
};

// ─── Icon component ────────────────────────────────────────────────────────────

function WeatherIcon({ condition }: { condition: WeatherCondition }) {
  return (
    <img
      src={CONDITION_SVG[condition]}
      alt={condition}
      width={64}
      height={64}
      className="w-full h-full"
    />
  );
}

// ─── Colour accent per condition ──────────────────────────────────────────────

function conditionGradient(condition: WeatherCondition): string {
  switch (condition) {
    case "clear-day":           return "text-amber-500";
    case "clear-night":         return "text-indigo-950";
    case "partly-cloudy-day":   return "text-sky-500";
    case "partly-cloudy-night": return "text-indigo-900";
    case "cloudy":              return "text-slate-500";
    case "fog":                 return "text-slate-400";
    case "drizzle":             return "text-primary-500";
    case "rain":                return "text-blue-500";
    case "snow":                return "text-sky-500";
    case "thunderstorm":        return "text-slate-700";
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
        "flex items-center gap-3 rounded-2xl border border-border/50 px-5 py-4 min-w-[220px]",
        className,
      )}>
        <span className="text-2xl">🌡️</span>
        <span className="text-[13px] text-muted-foreground">Weather unavailable</span>
      </div>
    );
  }

  if (!data) return null;

  const night = isNightCondition(data.condition);
  const textPrimary   = night ? "text-foreground"       : "text-foreground";
  const textSecondary = night ? "text-muted-foreground" : "text-muted-foreground";
  const border        = night ? "border-white/10"       : "border-border/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden px-5 py-4",
        "rounded-md min-w-[260px]",
        conditionGradient(data.condition),
        border,
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {/* Meteocons animated icon */}
        <div className="max-w-24 shrink-0">
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
