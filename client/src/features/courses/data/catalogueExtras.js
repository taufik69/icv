// Courses listed in the course finder that have no page in this app yet (they link to icv.edu.au).
// Same shape as a course module. The live page has no "at a glance" table, so the glance values below are
// DEMO placeholders — confirm duration, delivery and fee with ICV before launch.
export const catalogueExtras = [
  {
    market: 'domestic',
    slug: 'certificate-iv-in-disability',
    href: 'https://icv.edu.au/certificate-iv-in-disability/',
    code: 'CHC43115',
    title: 'Certificate IV in Disability',
    category: 'Community Services',
    images: {
      hero: {
        src: '/images/course-disability-wide.webp',
        width: 900,
        height: 600,
        alt: 'Disability support worker with a client',
      },
    },
    glance: [
      ['Start Date', 'Monthly Intake'],
      ['Duration', '52 Weeks'],
      ['Delivery Mode', 'Blended (Face-to-Face & Virtual Classroom)'],
      ['Tuition Fee', '$4,000'],
    ],
  },
]
