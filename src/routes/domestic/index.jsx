import { createFileRoute } from '@tanstack/react-router'
import { DomesticPage } from '@/features/domestic'

export const Route = createFileRoute('/domestic/')({
  component: DomesticPage,
})
