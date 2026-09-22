import { Link } from '@tanstack/react-router'
import { PageContainer } from './PageContainer'

export function NotFound() {
  return (
    <PageContainer>
      <div className="py-16 text-center">
        <h1 className="text-3xl">Page not found</h1>
        <Link to="/" className="mt-4 inline-block font-semibold underline">
          Go home
        </Link>
      </div>
    </PageContainer>
  )
}
