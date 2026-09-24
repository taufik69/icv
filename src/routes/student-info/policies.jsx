import { createFileRoute } from '@tanstack/react-router'
import { PoliciesPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/policies')({
  component: PoliciesPage,
})
