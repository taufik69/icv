import { createFileRoute } from '@tanstack/react-router'
import { CeoMessagePage } from '@/features/about'

export const Route = createFileRoute('/about/ceo-message')({
  component: CeoMessagePage,
})
