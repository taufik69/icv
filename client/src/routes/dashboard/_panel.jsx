import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardShell, meQuery } from '@/features/dashboard'

// Pathless layout: every /dashboard page except login gets the sidebar shell, and only with a staff
// session; otherwise it goes to sign in and comes back here afterwards.
export const Route = createFileRoute('/dashboard/_panel')({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      await queryClient.ensureQueryData(meQuery())
    } catch {
      throw redirect({ to: '/dashboard/login', search: { redirect: location.href } })
    }
  },
  component: DashboardShell,
})
