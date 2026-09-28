// Options from the icv.edu.au/enquire-now/ "Course Enquiry" form, verbatim.
export const studentTypes = ['Domestic', 'International']

export const courseOptions = [
  { code: 'CHC30121', title: 'Certificate III in Early Childhood Education and Care' },
  { code: 'CHC50121', title: 'Diploma of Early Childhood Education and Care' },
  { code: 'CHC43115', title: 'Certificate IV in Disability' },
  { code: 'CHC43015', title: 'Certificate IV in Ageing Support' },
  { code: 'CPC30220', title: 'Certificate III in Carpentry' },
  { code: 'CPC40120', title: 'Certificate IV in Building and Construction' },
  { code: 'CPC50220', title: 'Diploma of Building and Construction (Building)' },
  { code: 'CPCCWHS1001', title: 'Prepare to Work Safely in the Construction Industry' },
]

export const heardOptions = ['Google', 'Facebook', 'Instagram', 'Agent', 'Word of Mouth', 'Study Cairns/Gold Coast Website', 'Other']

// Site course codes that differ from the form's list.
const codeAlias = { CPCWHS1001: 'CPCCWHS1001' }
export const toFormCode = (code) => codeAlias[code] ?? code
