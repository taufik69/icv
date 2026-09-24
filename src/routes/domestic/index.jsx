import { createFileRoute } from '@tanstack/react-router'
import { LandingPage, domesticContent } from '@/features/courses'

export const Route = createFileRoute('/domestic/')({
  component: DomesticPage,
})

function DomesticPage() {
  return <LandingPage content={domesticContent} />
}
