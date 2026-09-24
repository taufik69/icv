import { createFileRoute } from '@tanstack/react-router'
import { StandardsPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/online-service-standards')({
  component: StandardsPage,
})
