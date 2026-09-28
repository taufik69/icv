import {
  BriefcaseIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  ImageIcon,
  LightbulbIcon,
  ScaleIcon,
  UsersIcon,
} from '@/shared/components/icons'

// Copy from icv.edu.au/why-choose-icv/ (card blurbs completed from /student-wellbeing-centre/).
export const heroContent = {
  eyebrow: 'What we offer',
  title: 'Why choose',
  highlight: 'ICV?',
  lead: 'Support that goes beyond the classroom, values that shape everything we do, and a campus in the heart of Melbourne.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const offerContent = {
  eyebrow: 'Student support',
  title: 'Here for you,',
  highlight: 'every step',
  items: [
    {
      title: 'Student Wellbeing Centre',
      text: 'We offer comprehensive student support services, including counselling. Our experienced counsellors provide a confidential and supportive environment where students can explore personal, academic, and emotional concerns.',
      to: '/about/student-wellbeing',
      hash: 'student-wellbeing',
      Icon: HeartIcon,
    },
    {
      title: 'Career Counselling Services',
      text: 'At the International College of Victoria, we understand the importance of guiding students towards successful and fulfilling careers — from exploring career paths to refining resumes and honing interview skills.',
      to: '/about/student-wellbeing',
      hash: 'career-counselling-services',
      Icon: BriefcaseIcon,
    },
    {
      title: 'Student Gallery',
      text: 'Get inspired by some of the work from our brightest students, and discover the journeys they have taken to get where they are today.',
      to: '/about/student-wellbeing',
      hash: 'student-gallery',
      Icon: ImageIcon,
    },
  ],
}

export const valuesContent = {
  eyebrow: 'Why ICV',
  title: 'The values we',
  highlight: 'live by',
  items: [
    { title: 'Excellence', text: 'Striving for academic and personal excellence in all endeavors.', Icon: LightbulbIcon },
    { title: 'Diversity', text: 'Embracing a rich tapestry of cultures and perspectives.', Icon: GlobeIcon },
    { title: 'Innovation', text: 'Fostering a dynamic and forward-thinking learning environment.', Icon: GraduationCapIcon },
    { title: 'Community', text: 'Nurturing a supportive and inclusive community for lifelong connections.', Icon: HeartIcon },
    { title: 'Integrity', text: 'Upholding the highest standards of honesty, ethics, and accountability.', Icon: ScaleIcon },
    { title: 'Team Work', text: 'We value the importance of team harmony.', Icon: UsersIcon },
  ],
}
