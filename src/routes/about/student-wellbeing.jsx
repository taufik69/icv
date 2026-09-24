import { createFileRoute } from '@tanstack/react-router'
import { WellbeingPage } from '@/features/wellbeing'

export const Route = createFileRoute('/about/student-wellbeing')({
  component: WellbeingPage,
})
