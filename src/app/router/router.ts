import { createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";
import { isAuthenticated } from "@/shared/lib/auth";
import { queryClient } from "@/shared/lib/query-client";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  basepath: import.meta.env.VITE_BASE_PATH || "/",
  context: {
    queryClient,
    auth: {
      isAuthenticated,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
