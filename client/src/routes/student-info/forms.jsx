import { createFileRoute } from '@tanstack/react-router'
import { FormsPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/forms')({
  component: FormsPage,
})
