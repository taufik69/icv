import { Link } from '@tanstack/react-router'
import { CheckCircleIcon } from '@/shared/components/icons'

// Shown after the API accepts the application. Names the next step rather than celebrating.
export function ApplySuccess({ name }) {
  return (
    <div role="status" className="flex min-h-96 flex-col items-start justify-center">
      <CheckCircleIcon className="size-12 text-primary-hover" />
      <h2 className="mt-5 text-3xl">Application received</h2>
      <p className="mt-2 max-w-md text-ink-muted">
        Thanks, {name}. Our admissions team will contact you by email or phone about your next steps.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/domestic" className="btn-shine rounded-pill bg-secondary px-7 py-3 font-heading font-semibold text-on-secondary transition hover:bg-secondary-dark hover:text-on-secondary">
          Browse courses
        </Link>
        <Link to="/" className="btn-shine rounded-pill px-7 py-3 font-heading font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary">
          Back to home
        </Link>
      </div>
    </div>
  )
}
