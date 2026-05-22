import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/inbox")({
  component: InboxLayout,
  notFoundComponent: () => {
    return <p>This inbox page doesn't exist!</p>
  },
});

function InboxLayout() {
  return <Outlet />;
}
