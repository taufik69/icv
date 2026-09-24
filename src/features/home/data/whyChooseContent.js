import { GraduationCapIcon, HeartIcon, PresentationIcon, UsersIcon } from '@/shared/components/icons'

export const whyChooseContent = {
  eyebrow: 'Why choose us',
  title: 'Why choose',
  highlight: 'ICV?',
  paragraphs: [
    'Our college offers top-notch academic programs with renowned faculty members who are experts in their fields. The curriculum could be rigorous and up-to-date, preparing students for success in their chosen careers. Also ICV boasts modern facilities, including well-equipped classrooms, libraries, and access to cutting-edge technology and resources that can enhance the learning experience and support academic growth.',
    'A vibrant campus community hosts diverse student clubs and organizations, cultural events and social activities, fostering connections and personal growth outside the classroom. Also ICV provides excellent career services, including internships, job placement assistance, networking opportunities, and alumni connections. This support can help students transition smoothly from academia to the professional world.',
  ],
  action: { label: 'Learn more about ICV', to: '/about/why-choose-icv' },
  features: [
    { title: 'Experienced Faculty', text: 'Renowned faculty members who are experts in their fields.', Icon: UsersIcon },
    { title: 'Popular Courses', text: 'A rigorous, up-to-date curriculum that prepares you for your chosen career.', Icon: GraduationCapIcon },
    { title: 'Quality Training', text: 'Well-equipped classrooms, libraries and access to cutting-edge technology.', Icon: PresentationIcon },
    { title: 'Student Wellbeing', text: 'Clubs, events and career services, from internships to job placement.', Icon: HeartIcon },
  ],
}
