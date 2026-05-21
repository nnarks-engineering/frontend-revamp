
import { useCallback, useState } from "react";
import type { WeatherLocation } from "./use-weather";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LocationStatus = "pending" | "granted" | "denied" | "browser-blocked";

interface StoredPreference {
  status: LocationStatus;
  lat?: number;
  lon?: number;
}

// ─── Storage key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "nnarks_location_pref";

function readStorage(): StoredPreference {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredPreference;
  } catch {
    // ignore corrupt data
  }
  return { status: "pending" };
}

function writeStorage(pref: StoredPreference) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  } catch {
    // ignore storage quota / private-mode errors
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLocationPreference() {
  const [pref, setPref] = useState<StoredPreference>(readStorage);

  const save = useCallback((next: StoredPreference) => {
    setPref(next);
    writeStorage(next);
  }, []);

  /** Ask the browser for location and store the result. */
  const grant = useCallback(async () => {
    if (!navigator.geolocation) {
      save({ status: "denied" });
      return;
    }

    // Check the Permissions API first — if the browser has hard-blocked
    // location we won't get a prompt; detect it and surface clear instructions.
    if ("permissions" in navigator) {
      try {
        const perm = await navigator.permissions.query({ name: "geolocation" });
        if (perm.state === "denied") {
          save({ status: "browser-blocked" });
          return;
        }
      } catch {
        // Permissions API unavailable — fall through to getCurrentPosition
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        save({
          status: "granted",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => save({ status: "browser-blocked" }), // silently failed → browser blocked
      { timeout: 10_000, maximumAge: 5 * 60 * 1000 },
    );
  }, [save]);

  /** Decline location access — weather will use the default fallback. */
  const deny = useCallback(() => save({ status: "denied" }), [save]);

  /** Reset to "pending" so the banner appears again and the user can re-decide. */
  const reset = useCallback(() => save({ status: "pending" }), [save]);

  const location: WeatherLocation | undefined =
    pref.status === "granted" && pref.lat != null && pref.lon != null
      ? { lat: pref.lat, lon: pref.lon }
      : undefined;

  return {
    status: pref.status,
    /** Resolved coordinates if the user granted access, otherwise undefined. */
    location,
    grant,
    deny,
    reset,
  };
}
