import { createFileRoute, redirect } from '@tanstack/react-router'

// Old address of one application (it was called an enrolment); sends it to the same record's new address.
export const Route = createFileRoute('/dashboard/_panel/enrolments/$enrolmentId')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/dashboard/applications/$applicationId', params: { applicationId: params.enrolmentId }, replace: true })
  },
})
