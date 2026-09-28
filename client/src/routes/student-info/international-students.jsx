import { createFileRoute } from '@tanstack/react-router'
import { IntlPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/international-students')({
  component: IntlPage,
})
