// Select options for course fields. Values match server/src/modules/course/course.constants.js.
const opts = (values) => values.map((value) => ({ value, label: value }))

export const marketOptions = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
]

export const studyAreaOptions = [
  { value: 'building', label: 'Building and construction' },
  { value: 'whiteCard', label: 'White card' },
  { value: 'ecec', label: 'Early childhood' },
  { value: 'community', label: 'Community services' },
  { value: 'management', label: 'Management' },
]

export const levelOptions = opts(['Short course', 'Certificate III', 'Certificate IV', 'Diploma', 'Graduate Diploma'])
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
export const studyAreaLabel = (area) => studyAreaOptions.find((o) => o.value === area)?.label ?? area
