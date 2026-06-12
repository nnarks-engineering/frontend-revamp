import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AuthLayout } from '@/components/auth/shared/AuthLayout'

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutWrapper,
})

function AuthLayoutWrapper() {
  return (
    <div className="auth-layout-container">
      <AuthLayout>
        <Outlet />
      </AuthLayout>

    </div>
  )
}
