import { createFileRoute } from '@tanstack/react-router'
import { CompliancePage } from '@/features/compliance'

export const Route = createFileRoute('/about/compliance-reports')({
  component: CompliancePage,
})
