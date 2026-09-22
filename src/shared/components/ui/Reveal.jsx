import { useInView } from '@/shared/hooks/useInView'

const delays = { 0: '', 100: 'delay-100', 200: 'delay-200', 300: 'delay-300', 500: 'delay-500' }
const offsets = {
  up: 'motion-safe:translate-y-8',
  left: 'motion-safe:-translate-x-10',
  right: 'motion-safe:translate-x-10',
  zoom: 'motion-safe:scale-95',
}

// Fades children in (sliding from `from`) when scrolled into view.
// No motion for reduced-motion users.
export function Reveal({ children, delay = 0, from = 'up', className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  const state = inView ? 'translate-0 scale-100 opacity-100' : `motion-safe:opacity-0 ${offsets[from]}`

  return (
    <Tag
      ref={ref}
      className={`motion-safe:transition motion-safe:duration-700 motion-safe:ease-out ${delays[delay]} ${state} ${className}`}
    >
      {children}
    </Tag>
  )
}
