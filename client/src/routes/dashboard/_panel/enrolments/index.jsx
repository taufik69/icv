import { createFileRoute, redirect } from '@tanstack/react-router'

// Old address of the Applications list (it was called Enrolments); keeps bookmarks and links working.
export const Route = createFileRoute('/dashboard/_panel/enrolments/')({
  beforeLoad: ({ search }) => {
    throw redirect({ to: '/dashboard/applications', search, replace: true })
  },
})
