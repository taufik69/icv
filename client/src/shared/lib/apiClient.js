import { env } from '@/shared/config/env'

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    // The ICV API answers errors as { error: { message, details? } }.
    const payload = await res.json().catch(() => null)
    const error = new Error(payload?.error?.message ?? `Request failed: ${res.status} ${res.statusText}`)
    error.status = res.status
    error.details = payload?.error?.details
    throw error
  }
  return res.status === 204 ? null : res.json()
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}
