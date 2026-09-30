import { BookOpenIcon, BriefcaseIcon, CheckCircleIcon, CoinsIcon, LayersIcon } from '@/shared/components/icons'
import { legal, contactCards } from '@/shared/config/footer'

// Labels for the course detail page (/courses/$market/$slug) and its shared sidebar.
const phone = contactCards.find((c) => /phone/i.test(c.title)).lines[0]

export const detailContent = {
  crumbs: [{ label: 'Courses', to: '/courses' }],
  marketNames: { domestic: 'Domestic students', international: 'International students' },
  facts: { duration: 'Duration', delivery: 'Delivery', location: 'Location', intake: 'Next intake' },
  tabs: [
    { id: 'overview', label: 'Overview', Icon: BookOpenIcon },
    { id: 'units', label: 'Units', Icon: LayersIcon },
    { id: 'entry', label: 'Entry requirements', Icon: CheckCircleIcon },
    { id: 'fees', label: 'Fees', Icon: CoinsIcon },
    { id: 'careers', label: 'Careers', Icon: BriefcaseIcon },
  ],
  titles: {
    overview: 'Course overview',
    units: 'Units of competency',
    entry: 'Entry requirements',
    fees: 'Fees',
    careers: 'Career and further study pathways',
    careerOutcomes: 'Career outcomes',
    pathways: 'Further study pathways',
    related: 'Related courses',
  },
  feesNote: 'Fees as listed by ICV. Your final fee is confirmed at enrolment.',
  sidebar: {
    priceLabel: 'Tuition from',
    intakeLabel: 'Next intake',
    enquire: 'Enquire now',
    apply: 'Apply now',
    guide: 'Download course guide',
    compare: 'Compare',
    save: 'Save',
    badges: [legal.ids.filter((id) => /RTO|CRICOS/.test(id)).join(', '), 'Nationally recognised qualification'],
    help: { title: 'Need help choosing?', text: 'Speak to a course adviser for personalised guidance.', phone },
  },
}
