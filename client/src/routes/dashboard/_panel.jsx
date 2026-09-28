import { createFileRoute } from '@tanstack/react-router'
import { DashboardShell } from '@/features/dashboard'

// Pathless layout: every /dashboard page except login gets the sidebar shell.
export const Route = createFileRoute('/dashboard/_panel')({
  component: DashboardShell,
})
