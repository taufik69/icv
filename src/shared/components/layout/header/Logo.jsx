import { Link } from '@tanstack/react-router'

const size = 'h-12 w-auto transition-all duration-700 ease-in-out md:h-14 group-data-[floating=true]/header:h-10 md:group-data-[floating=true]/header:h-11'

// White-lettered logo over banners; navy-lettered version crossfades in on the light floating bar.
export function Logo() {
  return (
    <Link to="/" activeOptions={{ exact: true }} aria-label="International College of Victoria — home" className="relative shrink-0">
      <img
        src="/images/icv-logo-white.webp"
        alt="International College of Victoria"
        width="240"
        height="110"
        fetchPriority="high"
        className={`${size} group-data-[floating=true]/header:opacity-0`}
      />
      <img
        src="/images/icv-logo-dark.webp"
        alt=""
        width="240"
        height="110"
        className={`${size} absolute inset-0 opacity-0 group-data-[floating=true]/header:opacity-100`}
      />
    </Link>
  )
}
