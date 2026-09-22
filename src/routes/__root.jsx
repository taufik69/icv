import { createRootRouteWithContext } from '@tanstack/react-router'
import { NotFound, RootLayout } from '@/shared/components/layout'

// Context type: { queryClient } — provided in src/app/router.js
export const Route = createRootRouteWithContext()({
  component: RootLayout,
  notFoundComponent: NotFound,
})
