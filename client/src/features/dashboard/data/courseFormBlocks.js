// Course blocks in page order. `editable` blocks have a form section; the rest are verbatim icv.edu.au copy
// kept as imported (shown in the outline, edited later). `required` blocks always show.
export const courseFormBlocks = [
  { id: 'basics', label: 'Course basics', required: true, editable: true },
  { id: 'overview', label: 'Overview', required: true, editable: true },
  { id: 'facts', label: 'Key facts', editable: true },
  { id: 'fees', label: 'Fees', editable: true },
  { id: 'detail', label: 'Detail page', editable: true },
  { id: 'glance', label: 'At a glance', editable: true },
  { id: 'funding', label: 'Funding band' },
  { id: 'career', label: 'Career opportunities' },
  { id: 'details', label: 'Course details' },
  { id: 'units', label: 'Units', editable: true },
  { id: 'placement', label: 'Work placement' },
  { id: 'rpl', label: 'RPL and credit transfer' },
  { id: 'employment', label: 'Employment pathways' },
  { id: 'cta', label: 'Closing call to action' },
]

// Section ids in page order (stable reference for scroll-spy).
export const courseBlockIds = courseFormBlocks.map((b) => b.id)
