import { BoltIcon, CoinsIcon, GraduationCapIcon, SparklesIcon } from '@/shared/components/icons'

// Copy from icv.edu.au/why-choose-icv/ (repeated sentence removed, typos fixed).
export const campusContent = {
  eyebrow: 'Discover our campus',
  title: 'Melbourne,',
  highlight: 'Victoria',
  paragraphs: [
    "Since 2013, International College of Victoria (ICV) has emerged as a beacon of academic excellence and cultural diversity in Australia's educational landscape. Initially established to cater to the growing demand for quality international education, ICV has since evolved into a prestigious institution renowned for its innovative teaching methods and comprehensive curriculum for both our Domestic and International students.",
    'Over the years, ICV has fostered a vibrant community of students from diverse cultural backgrounds, creating a dynamic learning environment enriched by global perspectives. Guided by a commitment to excellence and inclusivity, ICV continues to empower students to excel academically, professionally, and personally, shaping future leaders and global citizens.',
  ],
  image: {
    src: '/images/why-campus-1600.webp',
    srcSet: '/images/why-campus-800.webp 800w, /images/why-campus-1600.webp 1600w',
    alt: "Melbourne's city skyline over Princes Bridge and the Yarra River",
    caption: 'Melbourne CBD & Yarra River',
  },
  address: 'Level 1, 541 King St, West Melbourne VIC 3003',
}

export const scholarshipContent = {
  eyebrow: 'Fees and scholarships',
  title: 'Support to help you',
  highlight: 'reach your potential',
  text: "Studying at college or university is a big commitment, but it's equally important to upskill and gain a relevant qualification and real-world experience. We understand this often requires support, so we are proud to offer a wide range of scholarships for students looking to commence studies in 2024 and 2025 with us, whether local or international. Any support can be invaluable in enabling you to fully achieve your potential and fulfil your dream.",
  pillars: [
    { title: 'Our Mission', text: 'At ICV, our mission is to cultivate a transformative educational experience that empowers students from diverse backgrounds to excel academically.', Icon: SparklesIcon },
    { title: 'Our Vision', text: 'At ICV, our vision is to be a beacon of excellence and innovation in the realm of vocational education and training.', Icon: BoltIcon },
  ],
  cardTitle: 'Scholarships for local & international students',
  highlights: [
    { label: 'Scholarships', value: '2024 & 2025 intakes', Icon: CoinsIcon },
    { label: 'Open to', value: 'Local & International', Icon: GraduationCapIcon },
  ],
  action: { label: 'Enquire now', href: 'https://icv.edu.au/enquire-now/' },
  feesLink: { label: 'View fee schedule', href: 'https://icv.edu.au/fee-schedule/' },
}
