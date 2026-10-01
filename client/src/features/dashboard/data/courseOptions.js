import { MapPinIcon, PlaneIcon } from '@/shared/components/icons'

// Select options for course fields. Values match server/src/modules/course/course.constants.js.
// Study areas and levels are not here: staff manage them (hooks/useTaxonomy).
const opts = (values) => values.map((value) => ({ value, label: value }))

export const marketOptions = [
  { value: 'domestic', label: 'Domestic', hint: 'Australian students', Icon: MapPinIcon },
  { value: 'international', label: 'International', hint: 'Student visa holders', Icon: PlaneIcon },
]

export const deliveryOptions = [{ value: '', label: 'Not set' }, ...opts(['Face to face', 'Blended', 'In classroom', 'Online'])]
export const studyModeOptions = [{ value: '', label: 'Not set' }, ...opts(['Full-Time', 'Part-Time', 'Flexible'])]

export const feeKindOptions = [
  { value: 'tuition', label: 'Tuition' },
  { value: 'ffs', label: 'Fee for service' },
  { value: 'application', label: 'Application' },
  { value: 'material', label: 'Material' },
  { value: 'other', label: 'Other' },
]

export const statusLabels = { draft: 'Draft', active: 'Active', inactive: 'Inactive', archived: 'Archived' }
export const marketLabel = (market) => marketOptions.find((o) => o.value === market)?.label ?? market
