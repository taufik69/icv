// Copy from icv.edu.au/student-wellbeing-centre/ (career + gallery sections).
export const careerContent = {
  eyebrow: 'Career counselling',
  title: 'Career Counselling',
  highlight: 'Services',
  paragraphs: [
    'At the International College of Victoria, we understand the importance of guiding students towards successful and fulfilling careers. That’s why we offer comprehensive career counselling services aimed at helping students navigate their professional journey with confidence.',
    'With our guidance, students can confidently pave their path to a bright and rewarding future.',
  ],
  services: [
    'Exploring potential career paths',
    'Refining resumes',
    'Honing interview skills',
    'Internship opportunities',
    'Planning for post-graduate studies',
    'Entering the workforce',
  ],
  image: { src: '/images/wellbeing-career.webp', width: 626, height: 416, alt: 'Two students working through notes together at a laptop' },
}

export const galleryContent = {
  eyebrow: 'Student gallery',
  title: 'Get inspired by our',
  highlight: 'brightest students',
  text: 'Get inspired by some of the work from our brightest students, and discover the journeys they have taken to get where they are today.',
  image: { src: '/images/wellbeing-gallery.webp', width: 682, height: 306, alt: 'Student studying with notes and a laptop in a library' },
}

export const supportCta = {
  title: 'Need someone to talk to?',
  text: 'Reach out to our Student Wellbeing team. Every conversation is confidential.',
  actions: [
    { label: 'Call 03 9942 1836', href: 'tel:0399421836', kind: 'phone' },
    { label: 'Email info@icv.edu.au', href: 'mailto:info@icv.edu.au', kind: 'mail' },
  ],
}
