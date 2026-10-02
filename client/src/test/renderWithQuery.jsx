import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook } from '@testing-library/react'

// A fresh QueryClient per test (no retries, so failures show at once).
const client = () => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
const wrapper = (queryClient) => ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export const renderWithQuery = (ui) => render(ui, { wrapper: wrapper(client()) })
export const renderHookWithQuery = (hook) => renderHook(hook, { wrapper: wrapper(client()) })

// Stubs fetch with one JSON answer; returns the mock so tests can read the request.
export function answerFetch(vi, status, body) {
  const fetch = vi.fn(async () => new Response(status === 204 ? null : JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } }))
  vi.stubGlobal('fetch', fetch)
  return fetch
}
