import { Link } from '@tanstack/react-router'
import { useEnquiryModal } from '@/shared/lib/enquiryModal'

// Config-driven link: `to` = internal route (router <Link>), `href` = external URL.
// Internal links get aria-current="page" when active, so callers can style `aria-[current=page]:*`.
// `hash` (e.g. '/' + 'courses') jumps to a section; such links count as active only on that exact hash.
// An `href` starting with "/" (e.g. '/enquire-now?course=CHC43015') is treated as an internal route too.
// Links to /enquire-now open the enquiry form in a popup instead (keeping the real link, so new-tab and
// modifier clicks still go to the page).
export function AppLink({ to, href, hash, ...props }) {
  const enquiry = useEnquiryModal()
  if (!to && href?.startsWith('/')) {
    const [path, query] = href.split('?')
    return <AppLink to={path} search={Object.fromEntries(new URLSearchParams(query))} hash={hash} {...props} />
  }
  if (to === '/enquire-now' && enquiry) {
    const open = (e) => {
      props.onClick?.(e)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      enquiry.show(props.search?.course)
    }
    return <Link to={to} {...props} onClick={open} aria-haspopup="dialog" />
  }
  if (to) {
    const activeOptions = { exact: true, includeHash: !!hash }
    return <Link to={to} hash={hash} activeOptions={activeOptions} activeProps={{ 'aria-current': 'page' }} {...props} />
  }
  return <a href={href} {...props} />
}
