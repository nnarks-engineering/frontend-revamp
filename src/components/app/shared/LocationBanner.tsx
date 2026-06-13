import { AnimatePresence, motion } from "framer-motion";
import { Lock, MapPin, X } from "lucide-react";

import { useLocationPreference } from "@/shared/hooks/core/use-location-preference";

/**
 * LocationBanner — shown after login when location preference is "pending" or
 * "browser-blocked". Disappears permanently once the user grants or dismisses.
 */
export function LocationBanner() {
  const { status, grant, deny, reset } = useLocationPreference();

  const visible = status === "pending" || status === "browser-blocked";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={
            status === "browser-blocked"
              ? "flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-3 mb-4"
              : "flex items-center gap-3 bg-primary/5 border border-primary/15 px-4 py-3 mb-4"
          }
        >
          <div
            className={
              status === "browser-blocked"
                ? "w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"
                : "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
            }
          >
            {status === "browser-blocked" ? (
              <Lock className="w-4 h-4 text-amber-600" />
            ) : (
              <MapPin className="w-4 h-4 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {status === "browser-blocked" ? (
              <>
                <p className="text-[13px] font-medium text-foreground">
                  Location blocked by browser
                </p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">
                  Click the lock 🔒 in your address bar → allow location → then click{" "}
                  <strong>Try again</strong>.
                </p>
              </>
            ) : (
              <>
                <p className="text-[13px] font-medium text-foreground">
                  Enable location for local weather
                </p>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">
                  We'll use your location to show accurate weather on your dashboard.
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {status === "browser-blocked" ? (
              <>
                <button
                type="button"
                  onClick={reset}
                  className="px-3 py-1.5 text-[12px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  Try again
                </button>
                <button
                                type="button"
                  onClick={deny}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                                type="button"

                  onClick={grant}
                  className="px-3 py-1.5 text-[12px] font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Allow
                </button>
                <button
                                type="button"

                  onClick={deny}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

