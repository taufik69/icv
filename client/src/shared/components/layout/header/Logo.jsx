import { Link } from '@tanstack/react-router'
import { BrandLogo } from '@/shared/components/ui'

const size = 'text-[0.6875rem] md:text-[0.8125rem]'

// Same size in both header states (top bar and floating bar).
// White wordmark over banners; it turns navy on the light floating bar (the crest stays the same).
export function Logo() {
  return (
    <Link to="/" activeOptions={{ exact: true }} aria-label="International College of Victoria — home" className="relative shrink-0">
      <BrandLogo
        eager
        className={`${size} text-white transition-all duration-700 ease-in-out group-data-[floating=true]/header:text-secondary`}
      />
    </Link>
  )
}
