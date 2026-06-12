
import { useCallback, useSyncExternalStore } from "react";

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
const CHANGE_EVENT = "nnarks_location_changed";

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
    // Dispatch a custom event so other hook instances in the same tab react
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // ignore storage quota / private-mode errors
  }
}

// ─── Shared snapshot for useSyncExternalStore ─────────────────────────────────

let cachedSnapshot = readStorage();

function getSnapshot(): StoredPreference {
  return cachedSnapshot;
}

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => {
    cachedSnapshot = readStorage();
    onStoreChange();
  };
  // Listen for same-tab custom event and cross-tab storage event
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLocationPreference() {
  const pref = useSyncExternalStore(subscribe, getSnapshot);

  /** Ask the browser for location and store the result. */
  const grant = useCallback(async () => {
    if (!navigator.geolocation) {
      writeStorage({ status: "denied" });
      return;
    }

    // Check the Permissions API first — if the browser has hard-blocked
    // location we won't get a prompt; detect it and surface clear instructions.
    if ("permissions" in navigator) {
      try {
        const perm = await navigator.permissions.query({ name: "geolocation" });
        if (perm.state === "denied") {
          writeStorage({ status: "browser-blocked" });
          return;
        }
      } catch {
        // Permissions API unavailable — fall through to getCurrentPosition
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        writeStorage({
          status: "granted",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => writeStorage({ status: "browser-blocked" }), // silently failed → browser blocked
      { timeout: 10_000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  /** Decline location access — weather will use the default fallback. */
  const deny = useCallback(() => writeStorage({ status: "denied" }), []);

  /** Reset to "pending" so the banner appears again and the user can re-decide. */
  const reset = useCallback(() => writeStorage({ status: "pending" }), []);

  const location: WeatherLocation | undefined =
    pref.status === "granted" && pref.lat !== undefined && pref.lon !== undefined
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
