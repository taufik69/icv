import { createFileRoute } from '@tanstack/react-router'
import { EsosPage } from '@/features/student-info'

export const Route = createFileRoute('/student-info/esos-framework')({
  component: EsosPage,
})
