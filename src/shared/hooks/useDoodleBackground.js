import { useInView } from './useInView'

// Brand doodle pattern (icv.edu.au "bgimg-white"), requested only when the section nears the viewport.
// Desktop: background-attachment fixed. Mobile: scroll-driven drift (`parallax-bg`, animations.css).
// Returns [ref, className] — put both on the section; pair with a light bg (bg-surface).
export function useDoodleBackground() {
  const [ref, nearView] = useInView({ rootMargin: '300px 0px' })
  const image = nearView ? 'bg-[url(/images/doodle-bg.webp)]' : ''
  return [ref, `parallax-bg bg-auto bg-repeat lg:bg-fixed ${image}`]
}
