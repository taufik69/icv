import { Link } from '@tanstack/react-router'
import { CheckCircleIcon } from '@/shared/components/icons'
import { useEnrolmentCourses } from '../../hooks/useEnrolmentCourses'

// Shown after the last tab is submitted. UI only for now: nothing is sent yet.
export function EnrolmentSuccess({ values, onRestart }) {
  const course = useEnrolmentCourses().courses.find((c) => c.course === values.course)
  return (
    <div role="status" className="flex min-h-96 flex-col items-start justify-center">
      <CheckCircleIcon className="size-12 text-secondary-muted" />
      <h2 className="mt-5 text-3xl">Application submitted</h2>
      <p className="mt-2 max-w-lg text-ink-muted">
        Thanks, {values.givenNames}. ICV Admissions will assess your application for {course?.courseTitle || values.courseTitle || 'your course'} ({values.year})
        and, if it is approved, send your letter of offer and enrolment agreement to {values.email} within 5 working days.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/courses" className="btn-shine rounded-pill bg-secondary px-7 py-3 font-heading font-semibold text-white transition hover:bg-secondary-dark hover:text-white">
          Browse courses
        </Link>
        <button type="button" onClick={onRestart} className="rounded-pill px-7 py-3 font-heading font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary">
          Start a new application
        </button>
      </div>
    </div>
  )
}
