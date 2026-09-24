import { createFileRoute } from '@tanstack/react-router'
import { LandingPage, internationalContent } from '@/features/courses'

export const Route = createFileRoute('/international/')({
  component: InternationalPage,
})

function InternationalPage() {
  return <LandingPage content={internationalContent} />
}
