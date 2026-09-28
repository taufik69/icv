// Blocks of a public course page, in the order CoursePage renders them.
// `required` blocks always show; the rest appear on the page only when filled in.
export const courseFormBlocks = [
  { id: 'basics', label: 'Course basics', required: true, filled: true },
  { id: 'overview', label: 'Overview', required: true, filled: true },
  { id: 'glance', label: 'At a glance', required: true, filled: true },
  { id: 'funding', label: 'Funding band', filled: true },
  { id: 'career', label: 'Career opportunities', filled: false },
  { id: 'details', label: 'Course details', filled: false },
  { id: 'units', label: 'Units', filled: true },
  { id: 'rpl', label: 'RPL and credit transfer', filled: false },
  { id: 'employment', label: 'Employment pathways', filled: false },
  { id: 'cta', label: 'Closing call to action', filled: false },
]

export const marketOptions = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
]

export const categoryOptions = [
  { value: 'building', label: 'Building and construction' },
  { value: 'whiteCard', label: 'White card' },
  { value: 'ecec', label: 'Early childhood' },
  { value: 'community', label: 'Community services' },
]

// Example rows so the repeatable editors show their shape (CPC40120).
export const sampleGlance = [
  ['Tuition fee', '0* fee for eligible students'],
  ['Start date', 'Monthly intake'],
  ['Duration', '48 weeks'],
  ['Delivery mode', 'Blended (face-to-face & virtual classroom)'],
]

export const sampleUnits = [
  ['CPCCBC4001', 'Apply building codes and standards to the construction process for Class 1 and 10 buildings'],
  ['CPCCBC4002', 'Manage work health and safety in the building and construction workplace'],
  ['CPCCBC4007', 'Plan building or construction work'],
]
