// From "Enrolment Application Form – International" V8.0 (16 July 2026). The courses and their fees
// come from the API (useEnrolmentCourses), not from this file.
export const intakeYears = ['2026', '2027']

export const feeNote =
  'Note: Application Fee $500 and OSHC are not included above. Material fee includes reading material like course books, learner guides, etc.'

// (A) columns, in the paper form's order. Keys match the form values and toEnrolmentCourse.
export const courseColumns = [
  { key: 'course', label: 'Course code', placeholder: 'e.g. CPC30220', className: 'col-span-2 md:col-span-1' },
  { key: 'courseTitle', label: 'Course title', placeholder: 'e.g. Certificate III in Carpentry', className: 'col-span-2 md:col-span-3' },
  { key: 'duration', label: 'Duration', placeholder: 'e.g. 64 Weeks' },
  { key: 'applicationFee', label: 'Application fee', placeholder: 'e.g. $500' },
  { key: 'tuitionFee', label: 'Tuition fee', placeholder: 'e.g. $500' },
  { key: 'materialFee', label: 'Material fee', placeholder: 'e.g. $500' },
]

export const paperForm = {
  label: 'Download the PDF form',
  href: '/forms/enrolment-application-international-v8.pdf',
  version: 'V8.0 Effective 16th July 2026',
}
