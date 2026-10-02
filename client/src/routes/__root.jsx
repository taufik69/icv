import { lazy, Suspense } from 'react'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { NotFound, RootLayout } from '@/shared/components/layout'
import { useEnquiryModal } from '@/shared/lib/enquiryModal'

// The enquiry popup's code loads only the first time an "Enquire" link is clicked.
const EnquiryDialog = lazy(() => import('@/features/apply').then((m) => ({ default: m.EnquiryDialog })))

// Context type: { queryClient } — provided in src/app/router.js
export const Route = createRootRouteWithContext()({
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  const enquiry = useEnquiryModal()
  return (
    <>
      <RootLayout />
      {enquiry?.request && (
        <Suspense fallback={null}>
          <EnquiryDialog />
        </Suspense>
      )}
    </>
  )
}
