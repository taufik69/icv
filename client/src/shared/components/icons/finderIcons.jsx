import { Icon } from './Icon'

export const ClockIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
)

export const SlidersIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icon>
)

export const LayersIcon = (p) => (
  <Icon {...p}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </Icon>
)

export const BookmarkIcon = (p) => (
  <Icon {...p}>
    <path d="M6 3h12v18l-6-4-6 4z" />
  </Icon>
)
