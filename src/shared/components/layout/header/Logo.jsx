import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link to="/" activeOptions={{ exact: true }} aria-label="International College of Victoria — home" className="shrink-0">
      <img
        src="/images/icv-logo-white.webp"
        alt="International College of Victoria"
        width="240"
        height="110"
        fetchPriority="high"
        className="h-12 w-auto transition-all duration-700 ease-in-out md:h-14 group-data-[floating=true]/header:h-10 md:group-data-[floating=true]/header:h-11"
      />
    </Link>
  )
}
