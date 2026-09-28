import { createFileRoute } from '@tanstack/react-router'
import { TestimonialsPage } from '@/features/testimonials'

export const Route = createFileRoute('/about/testimonials')({
  component: TestimonialsPage,
})
