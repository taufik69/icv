import { createFileRoute } from '@tanstack/react-router'
import { FeeSchedulePage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/fee-schedule')({
  component: FeeSchedulePage,
})
