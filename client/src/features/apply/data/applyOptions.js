// Options from the icv.edu.au/enquire-now/ "Course Enquiry" form, verbatim.
export const studentTypes = ['Domestic', 'International']

// `group` only drives the headings in the course dropdown; order matches the live form, plus Stonemasonry
// and the Graduate Diploma (ICV international courses the live form doesn't list yet).
export const courseOptions = [
  { code: 'CHC30121', title: 'Certificate III in Early Childhood Education and Care', group: 'Early childhood' },
  { code: 'CHC50121', title: 'Diploma of Early Childhood Education and Care', group: 'Early childhood' },
  { code: 'CHC43115', title: 'Certificate IV in Disability', group: 'Community services' },
  { code: 'CHC43015', title: 'Certificate IV in Ageing Support', group: 'Community services' },
  { code: 'CPC30220', title: 'Certificate III in Carpentry', group: 'Building and construction' },
  { code: 'CPC40120', title: 'Certificate IV in Building and Construction', group: 'Building and construction' },
  { code: 'CPC50220', title: 'Diploma of Building and Construction (Building)', group: 'Building and construction' },
  { code: 'CPCCWHS1001', title: 'Prepare to Work Safely in the Construction Industry', group: 'Building and construction' },
  { code: 'CPC32320', title: 'Certificate III in Stonemasonry', group: 'Building and construction' },
  { code: 'BSB80120', title: 'Graduate Diploma in Management (Learning)', group: 'Management' },
]

export const heardOptions = ['Google', 'Facebook', 'Instagram', 'Agent', 'Word of Mouth', 'Study Cairns/Gold Coast Website', 'Other']

// Site course codes that differ from the form's list: a typo'd White Card code, and the 2025 releases of
// the early childhood courses (CHC30125 / CHC50125 replace the form's CHC30121 / CHC50121).
const codeAlias = { CPCWHS1001: 'CPCCWHS1001', CHC30125: 'CHC30121', CHC50125: 'CHC50121' }
export const toFormCode = (code) => codeAlias[code] ?? code
