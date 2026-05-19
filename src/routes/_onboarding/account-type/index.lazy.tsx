import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_onboarding/account-type/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>ssdssd</div>;
}
