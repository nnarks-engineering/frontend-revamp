/**
 * QueryClient factory — single, well-tuned instance.
 *
 * Extracted from AppProviders so it can be imported by other modules
 * (e.g. router loaders, prefetching utilities) without pulling in React.
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * Data is considered fresh for 2 minutes.
       * During that window, navigating back to a page won't trigger
       * a background refetch — it will use the cached value instantly.
       */
      staleTime: 1000 * 60 * 2,

      /**
       * Unused data stays in cache for 5 minutes after the last
       * subscriber unmounts. Enough time for a user to navigate
       * away and come back without re-fetching.
       */
      gcTime: 1000 * 60 * 5,

      /** Retry once on failure, then surface the error. */
      retry: 1,

      /** Don't refetch when the browser tab regains focus in dev. */
      refetchOnWindowFocus: import.meta.env.PROD,
    },
    mutations: {
      /** Mutations never auto-retry — let the user decide. */
      retry: false,
    },
  },
});
