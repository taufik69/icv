import { createFileRoute } from '@tanstack/react-router'
import { WhyChoosePage } from '@/features/why-choose'

export const Route = createFileRoute('/about/why-choose-icv')({
  component: WhyChoosePage,
})
