import { Icon } from './Icon'

// Icons for the staff dashboard.
export const PlusIcon = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
)

export const LockIcon = (p) => (
  <Icon {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
)

export const EyeIcon = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
)

export const LogOutIcon = (p) => (
  <Icon {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </Icon>
)

export const TrashIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </Icon>
)

export const UploadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
  </Icon>
)

export const GripIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" />
    <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
    <circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" />
  </Icon>
)

export const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
)
