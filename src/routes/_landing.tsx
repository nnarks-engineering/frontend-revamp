import { createFileRoute, Outlet } from '@tanstack/react-router'
import "@/app/styles/landing.css";

export const Route = createFileRoute('/_landing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />;
}
