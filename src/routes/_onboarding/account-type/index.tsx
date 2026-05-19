import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_onboarding/account-type/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/account-type"!</div>
}
