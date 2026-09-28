import { useContext } from 'react'
import { toFormCode } from '@/features/apply'
import { AppLink } from '@/shared/components/ui'
import { links } from '../../data/links'
import { CourseContext } from '../../lib/courseContext'

// A course-page action. Enquiry links go to the local /enquire-now page with this course pre-selected;
// every other action (enrolment portal, PDFs…) stays a normal link.
export function ActionLink({ action, children = action.label, ...props }) {
  const course = useContext(CourseContext)
  const href = action.href === links.enquire && course ? `${links.enquire}?course=${toFormCode(course.code)}` : action.href
  return (
    <AppLink href={href} {...props}>
      {children}
    </AppLink>
  )
}
