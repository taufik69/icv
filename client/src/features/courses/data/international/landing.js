import { images } from '../images'
import { links } from '../links'
import { domesticContent } from '../domestic/landing'

// Copy from icv.edu.au/international/, verbatim. ("Student Prospectus" has no link on the live page, so it is left out.)
export const internationalContent = {
  hero: { ...domesticContent.hero, title: 'International' },
  enquire: domesticContent.enquire,
  welcome: {
    eyebrow: 'WLCOME TO',
    title: 'INTERNATIONAL COLLEGE OF VICTORIA',
    paragraphs: [
      'International College of Victoria (ICV) is a leading registered training organisation delivering hands-on training to both local and international students from Certificate III to Diploma courses across various industry sectors.',
      'Located in the heart of Melbourne, with delivery locations across metropolitan Melbourne, ICV focuses on practical skills and hands-on experience, that prepare students for the workplace and graduate with the knowledge to thrive in their careers.',
    ],
    image: images.studentsOutdoors,
  },
  courses: {
    title: 'INTERNATIONAL COURSES',
    apply: { label: 'APPLY NOW', href: links.enquire },
    items: [
      { code: 'CPC30220', title: 'Certificate III in Carpentry', to: '/international/certificate-iii-in-carpentry', image: images.carpentryCourse, text: 'This qualification provides a trade outcome in carpentry, covering work in residential and commercial applications.' },
      { code: 'CPC40120', title: 'Certificate IV in Building and Construction', to: '/international/cert-iv-building-and-construction', image: images.builder, text: 'This qualification reflects the role of builders, site managers and managers of small..' },
      { code: 'CPC50220', title: 'Diploma of Building and Construction (Building)', to: '/international/diploma-of-building-and-construction', image: images.buildingSite, text: 'This qualification reflects the role of building professionals who apply knowledge..' },
      { code: 'BSB80120', title: 'Graduate Diploma in Management (Learning)', to: '/international/graduate-diploma-in-management-learning', image: images.student, text: 'This qualification reflects the role of individuals who apply highly specialised knowledge..' },
    ],
  },
  why: {
    title: 'WHY CHOOSE US ?',
    paragraphs: [
      'Our college offers top-notch academic programs with renowned faculty members who are experts in their fields. The curriculum could be rigorous and up-to-date, preparing students for success in their chosen careers. Also ICV boasts modern facilities, including well-equipped classrooms, libraries, and access to cutting-edge technology and resources that can enhance the learning experience and support academic growth.',
      'A vibrant campus community hosts diverse student clubs and organizations, cultural events and social activities, fostering connections and personal growth outside the classroom. Also ICV provides excellent career services, including internships, job placement assistance, networking opportunities, and alumni connections. This support can help students transition smoothly from academia to the professional world.',
    ],
    features: ['Experienced Faculty', 'Popular Courses', 'Quality Training'],
    image: images.whyStudents,
  },
  enrol: {
    title: 'SCHOLARSHIP AVAILABLE FOR INTERNATIONAL STUDENTS',
    subtitle: 'Explore courses available at ICV.',
    launchTitle: 'LAUNCH YOUR CAREER TO A NEW LEVEL!',
    list: ['State-of-the-Art Facilities', 'Supportive Faculty and Staff', 'Gain Skills and Knowledge to work', 'Vibrant Campus Life', 'Student Support and Well being Centre'],
    action: { label: 'ENQUIRE NOW', href: links.enquire },
  },
  study: domesticContent.study,
}
