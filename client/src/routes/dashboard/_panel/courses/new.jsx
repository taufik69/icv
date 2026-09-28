import { createFileRoute } from '@tanstack/react-router'
import { CourseFormPage } from '@/features/dashboard'

export const Route = createFileRoute('/dashboard/_panel/courses/new')({
  component: CourseFormPage,
})
