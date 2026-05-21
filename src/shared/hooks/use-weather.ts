/**
 * useWeather — fetches current weather for the user's location.
 *
 * APIs used (both free, no API key required):
 *  - Open-Meteo  https://open-meteo.com/
 *  - Nominatim   https://nominatim.openstreetmap.org/
 */

import { useQuery } from "@tanstack/react-query";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WeatherCondition =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm";

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  conditionText: string;
  locationName: string;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
}

// ─── WMO Weather Interpretation Codes ─────────────────────────────────────────

const WMO: Record<number, { base: string; text: string }> = {
  0: { base: "clear", text: "Clear Sky" },
  1: { base: "partly-cloudy", text: "Mainly Clear" },
  2: { base: "partly-cloudy", text: "Partly Cloudy" },
  3: { base: "cloudy", text: "Overcast" },
  45: { base: "fog", text: "Foggy" },
  48: { base: "fog", text: "Rime Fog" },
  51: { base: "drizzle", text: "Light Drizzle" },
  53: { base: "drizzle", text: "Drizzle" },
  55: { base: "drizzle", text: "Dense Drizzle" },
  61: { base: "rain", text: "Light Rain" },
  63: { base: "rain", text: "Rain" },
  65: { base: "rain", text: "Heavy Rain" },
  71: { base: "snow", text: "Light Snow" },
  73: { base: "snow", text: "Snow" },
  75: { base: "snow", text: "Heavy Snow" },
  77: { base: "snow", text: "Snow Grains" },
  80: { base: "rain", text: "Rain Showers" },
  81: { base: "rain", text: "Rain Showers" },
  82: { base: "rain", text: "Heavy Showers" },
  85: { base: "snow", text: "Snow Showers" },
  86: { base: "snow", text: "Heavy Snow Showers" },
  95: { base: "thunderstorm", text: "Thunderstorm" },
  96: { base: "thunderstorm", text: "Thunderstorm" },
  99: { base: "thunderstorm", text: "Thunderstorm" },
};

// ─── Location ─────────────────────────────────────────────────────────────────

/** Pass explicit coordinates to skip geolocation (e.g. a project location from the backend). */
export interface WeatherLocation {
  lat: number;
  lon: number;
}

/** Fallback when geolocation is unavailable or denied. */
const FALLBACK_LOCATION: WeatherLocation = { lat: 5.56, lon: -0.2 }; // Greater Accra, GH

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveCondition(base: string, isDay: boolean): WeatherCondition {
  if (base === "clear") return isDay ? "clear-day" : "clear-night";
  if (base === "partly-cloudy") return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
  return base as WeatherCondition;
}

/** Resolves coordinates: explicit override → Greater Accra fallback. */
function getCoords(override?: WeatherLocation): WeatherLocation {
  return override ?? FALLBACK_LOCATION;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchWeatherData(location?: WeatherLocation): Promise<WeatherData> {
  const { lat, lon } = getCoords(location);

  const [weatherRes, geoRes] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day` +
      `&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`,
    ),
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,
      { headers: { "Accept-Language": "en" } },
    ),
  ]);

  if (!weatherRes.ok) throw new Error("Weather API error");

  const weather = await weatherRes.json();
  const geo = await geoRes.json();

  const cur = weather.current;
  const isDay = cur.is_day === 1;
  const wmo = WMO[cur.weather_code as number] ?? { base: "cloudy", text: "Unknown" };
  const addr = (geo.address ?? {}) as Record<string, string>;
  const city = addr.city ?? addr.town ?? addr.village ?? addr.county ?? "";
  const cc = addr.country_code?.toUpperCase() ?? "";

  return {
    temperature: Math.round(cur.temperature_2m),
    feelsLike: Math.round(cur.apparent_temperature),
    condition: resolveCondition(wmo.base, isDay),
    conditionText: wmo.text,
    locationName: [city, cc].filter(Boolean).join(", ") || "Your Location",
    humidity: cur.relative_humidity_2m,
    windSpeed: Math.round(cur.wind_speed_10m),
    isDay,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Fetches current weather.
 *
 * @param location - Optional explicit coordinates (e.g. a project's location
 *   passed down from the backend). When omitted, uses browser geolocation and
 *   falls back to Greater Accra if permission is denied.
 */
export function useWeather(location?: WeatherLocation) {
  return useQuery({
    queryKey: ["weather", location ? `${location.lat},${location.lon}` : "current"],
    queryFn: () => fetchWeatherData(location),
    staleTime: 15 * 60 * 1000, // re-fetch after 15 min
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
