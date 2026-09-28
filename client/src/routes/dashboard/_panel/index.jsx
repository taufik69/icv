import { createFileRoute, redirect } from '@tanstack/react-router'

// Courses is the only dashboard area so far.
export const Route = createFileRoute('/dashboard/_panel/')({
  beforeLoad: () => {
    throw redirect({ to: '/dashboard/courses' })
  },
})
