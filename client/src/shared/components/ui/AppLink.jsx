import { Link } from '@tanstack/react-router'

// Config-driven link: `to` = internal route (router <Link>), `href` = external URL.
// Internal links get aria-current="page" when active, so callers can style `aria-[current=page]:*`.
// `hash` (e.g. '/' + 'courses') jumps to a section; such links count as active only on that exact hash.
export function AppLink({ to, href, hash, ...props }) {
  if (to) {
    const activeOptions = { exact: true, includeHash: !!hash }
    return <Link to={to} hash={hash} activeOptions={activeOptions} activeProps={{ 'aria-current': 'page' }} {...props} />
  }
  return <a href={href} {...props} />
}
