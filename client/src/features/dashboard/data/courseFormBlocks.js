// The course form's parts in order. `step` numbers the editable parts (form headings + outline);
// blocks without a step are verbatim icv.edu.au copy kept as imported (outline only, edited later).
// `where` tells staff where the part shows on the website. `required` parts always show.
export const courseFormBlocks = [
  { id: 'basics', step: 1, label: 'Basic information', required: true, editable: true, where: 'Course title, code and level — shown in the page header, on course cards and in the course finder.' },
  { id: 'overview', step: 2, label: 'Overview', required: true, editable: true, where: 'The "Overview" tab: what the course is about.' },
  { id: 'facts', step: 3, label: 'Key facts', editable: true, where: 'Duration, delivery, intake and campus — the fact tiles at the top of the course page and on finder cards.' },
  { id: 'units', step: 4, label: 'Units', editable: true, where: 'The "Units" tab: packaging rules and the core and elective units.' },
  { id: 'entry', step: 5, label: 'Entry requirements', editable: true, where: 'The "Entry requirements" tab: who can enrol and what they need first.' },
  { id: 'fees', step: 6, label: 'Fees', editable: true, where: 'The "Fees" tab, the price in the enrol box and "From $X" on finder cards.' },
  { id: 'careers', step: 7, label: 'Careers and pathways', editable: true, where: 'The "Careers" tab: jobs this course leads to and what to study next.' },
  { id: 'media', step: 8, label: 'Photos and documents', editable: true, where: 'The header photo, the course card photo and the "Download course guide" button.' },
  { id: 'glance', step: 9, label: 'At a glance table', editable: true, where: 'The fact table on the icv.edu.au-style course page, copied word for word.' },
  { id: 'funding', label: 'Funding band' },
  { id: 'career', label: 'Career opportunities' },
  { id: 'details', label: 'Course details' },
  { id: 'placement', label: 'Work placement' },
  { id: 'rpl', label: 'RPL and credit transfer' },
  { id: 'employment', label: 'Employment pathways' },
  { id: 'cta', label: 'Closing call to action' },
]

// Section ids in page order (stable reference for scroll-spy).
export const courseBlockIds = courseFormBlocks.map((b) => b.id)

export const blockById = Object.fromEntries(courseFormBlocks.map((b) => [b.id, b]))
