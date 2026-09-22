import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { queryClient } from '@/shared/lib/queryClient'

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Let TanStack Query own caching; loaders just warm the query cache
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})
