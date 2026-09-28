import { createFileRoute } from '@tanstack/react-router'
import { BrokersPage } from '@/features/compliance'

export const Route = createFileRoute('/about/brokers')({
  component: BrokersPage,
})
