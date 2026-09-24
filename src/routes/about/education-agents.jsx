import { createFileRoute } from '@tanstack/react-router'
import { AgentsPage } from '@/features/education-agents'

export const Route = createFileRoute('/about/education-agents')({
  component: AgentsPage,
})
