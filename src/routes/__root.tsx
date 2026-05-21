import type { RouterContext } from "@/shared/middleware";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )} */}
    </>
  ),
});
