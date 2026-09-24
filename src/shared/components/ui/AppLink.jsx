import { Link } from '@tanstack/react-router'

// Config-driven link: `to` = internal route (router <Link>), `href` = external URL.
// Internal links get aria-current="page" when active, so callers can style `aria-[current=page]:*`.
export function AppLink({ to, href, ...props }) {
  if (to) return <Link to={to} activeOptions={{ exact: true }} activeProps={{ 'aria-current': 'page' }} {...props} />
  return <a href={href} {...props} />
}
