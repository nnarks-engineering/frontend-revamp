import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/organization")({
  component: OrganizationLayout,
});

function OrganizationLayout() {
  return <Outlet />;
}
