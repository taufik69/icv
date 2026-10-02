// Where to go after signing in: only a dashboard path on this site (never another host, "//evil.com" or
// "/dashboard/login" itself); anything else falls back to the dashboard home.
export function safeRedirect(target) {
  if (typeof target !== 'string' || !/^\/dashboard(\/|\?|$)/.test(target) || target.startsWith('/dashboard/login')) return '/dashboard'
  return target
}
