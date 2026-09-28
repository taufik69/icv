import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/features/dashboard'

export const Route = createFileRoute('/dashboard/login')({
  component: LoginPage,
})
