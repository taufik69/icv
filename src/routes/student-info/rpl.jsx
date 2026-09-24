import { createFileRoute } from '@tanstack/react-router'
import { RplPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/rpl')({
  component: RplPage,
})
