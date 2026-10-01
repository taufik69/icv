import { Icon } from './Icon'

// Rich text toolbar icons.
export const BoldIcon = (p) => (
  <Icon {...p}><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" /></Icon>
)

export const ItalicIcon = (p) => (
  <Icon {...p}><path d="M19 4h-9" /><path d="M14 20H5" /><path d="M15 4 9 20" /></Icon>
)

export const UnderlineIcon = (p) => (
  <Icon {...p}><path d="M6 4v6a6 6 0 0 0 12 0V4" /><path d="M4 20h16" /></Icon>
)

export const HeadingIcon = (p) => (
  <Icon {...p}><path d="M6 12h12" /><path d="M6 20V4" /><path d="M18 20V4" /></Icon>
)

export const ListIcon = (p) => (
  <Icon {...p}>
    <path d="M3 5h.01" /><path d="M3 12h.01" /><path d="M3 19h.01" />
    <path d="M8 5h13" /><path d="M8 12h13" /><path d="M8 19h13" />
  </Icon>
)

export const ListOrderedIcon = (p) => (
  <Icon {...p}>
    <path d="M10 5h11" /><path d="M10 12h11" /><path d="M10 19h11" />
    <path d="M4 4h1v5" /><path d="M4 9h2" /><path d="M6.5 20H3.4c0-1 2.6-1.9 2.6-3.5a1.5 1.5 0 0 0-2.6-1" />
  </Icon>
)

export const QuoteIcon = (p) => (
  <Icon {...p}>
    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
  </Icon>
)

export const LinkIcon = (p) => (
  <Icon {...p}>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </Icon>
)

export const UndoIcon = (p) => (
  <Icon {...p}><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></Icon>
)

export const RedoIcon = (p) => (
  <Icon {...p}><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></Icon>
)
