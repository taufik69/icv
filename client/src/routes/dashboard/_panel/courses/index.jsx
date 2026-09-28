import { createFileRoute } from '@tanstack/react-router'
import { CoursesPage } from '@/features/dashboard'

export const Route = createFileRoute('/dashboard/_panel/courses/')({
  component: CoursesPage,
})
