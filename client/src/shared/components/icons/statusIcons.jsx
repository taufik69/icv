import { Icon } from './Icon'

// Icons for error and empty states.
export const ServerOffIcon = (p) => (
  <Icon {...p}>
    <path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" /><path d="M10 10 2.5 2.5" />
    <path d="M22 17v-1a2 2 0 0 0-2-2h-1" /><path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5" />
    <path d="M6 18h.01" /><path d="M6 6h.01" /><path d="m2 2 20 20" />
  </Icon>
)

export const AlertTriangleIcon = (p) => (
  <Icon {...p}>
    <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" />
    <path d="M12 9v4" /><path d="M12 17h.01" />
  </Icon>
)

export const FileSearchIcon = (p) => (
  <Icon {...p}>
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M4.3 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v7" />
    <circle cx="5" cy="17" r="3" /><path d="m9 21-1.8-1.8" />
  </Icon>
)

export const RefreshIcon = (p) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M8 16H3v5" />
  </Icon>
)
