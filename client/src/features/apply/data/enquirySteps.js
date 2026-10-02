import { BriefcaseIcon, HammerIcon, HeartIcon, LayersIcon, SmileIcon, UsersIcon } from '@/shared/components/icons'

// The five steps of the enquiry form. `fields` are what that step asks for (used to check it and to send
// a server error back to the right step).
export const enquirySteps = [
  { id: 'type', title: 'Student type', heading: 'Where are you studying from?', lead: 'This helps us send you the right information.', fields: ['studentType'] },
  { id: 'course', title: 'Course interest', heading: 'What would you like to study?', lead: 'Pick an area, then a course. You can change this later.', fields: ['course'] },
  { id: 'contact', title: 'Contact details', heading: 'Your contact details', lead: 'So our admissions team can reach you.', fields: ['firstName', 'lastName', 'email', 'phone'] },
  { id: 'about', title: 'About you', heading: 'A little about you', lead: 'Optional, but it helps us advise you.', fields: ['dob', 'street', 'city', 'state', 'postcode', 'country'] },
  { id: 'extra', title: 'Anything else', heading: 'Anything else?', lead: 'Tell us how you found ICV and anything we should know.', fields: ['heard', 'message'] },
]

// Study areas shown as tiles on the course step, each with the course codes (from applyOptions) in it.
export const studyAreas = [
  { id: 'building', label: 'Building & Construction', Icon: LayersIcon, codes: ['CPC40120', 'CPC50220', 'CPC32320', 'CPCCWHS1001'] },
  { id: 'carpentry', label: 'Carpentry', Icon: HammerIcon, codes: ['CPC30220'] },
  { id: 'aged', label: 'Aged Care', Icon: HeartIcon, codes: ['CHC43015'] },
  { id: 'disability', label: 'Disability Support', Icon: UsersIcon, codes: ['CHC43115'] },
  { id: 'childhood', label: 'Early Childhood Education', Icon: SmileIcon, codes: ['CHC30121', 'CHC50121'] },
  { id: 'management', label: 'Business & Leadership', Icon: BriefcaseIcon, codes: ['BSB80120'] },
]

export const areaOfCourse = (code) => studyAreas.find((a) => a.codes.includes(code))?.id
