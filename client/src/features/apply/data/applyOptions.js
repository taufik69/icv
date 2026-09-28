// Options from the icv.edu.au/enquire-now/ "Course Enquiry" form, verbatim.
export const studentTypes = ['Domestic', 'International']

// `group` only drives the headings in the course dropdown; order matches the live form.
export const courseOptions = [
  { code: 'CHC30121', title: 'Certificate III in Early Childhood Education and Care', group: 'Early childhood' },
  { code: 'CHC50121', title: 'Diploma of Early Childhood Education and Care', group: 'Early childhood' },
  { code: 'CHC43115', title: 'Certificate IV in Disability', group: 'Community services' },
  { code: 'CHC43015', title: 'Certificate IV in Ageing Support', group: 'Community services' },
  { code: 'CPC30220', title: 'Certificate III in Carpentry', group: 'Building and construction' },
  { code: 'CPC40120', title: 'Certificate IV in Building and Construction', group: 'Building and construction' },
  { code: 'CPC50220', title: 'Diploma of Building and Construction (Building)', group: 'Building and construction' },
  { code: 'CPCCWHS1001', title: 'Prepare to Work Safely in the Construction Industry', group: 'Building and construction' },
]

export const heardOptions = ['Google', 'Facebook', 'Instagram', 'Agent', 'Word of Mouth', 'Study Cairns/Gold Coast Website', 'Other']

// Site course codes that differ from the form's list.
const codeAlias = { CPCWHS1001: 'CPCCWHS1001' }
export const toFormCode = (code) => codeAlias[code] ?? code
