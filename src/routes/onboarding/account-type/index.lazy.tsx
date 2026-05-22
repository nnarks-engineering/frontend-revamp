import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onboarding/account-type/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>ssdssd</div>;
}
