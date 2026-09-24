// Copy from icv.edu.au/student-wellbeing-centre/ (images re-encoded to WebP).
export const heroContent = {
  eyebrow: 'Student support',
  title: 'Student Wellbeing',
  highlight: 'Centre',
  lead: 'Confidential counselling, career guidance and a supportive community, so every student can thrive academically, emotionally and socially.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
  jumpLinks: [
    { label: 'Our counsellor', hash: 'counsellor' },
    { label: 'Wellbeing', hash: 'student-wellbeing' },
    { label: 'Career counselling', hash: 'career-counselling-services' },
    { label: 'Student gallery', hash: 'student-gallery' },
  ],
}

export const counsellorContent = {
  eyebrow: 'About the counsellor',
  name: 'Hafsa Ali',
  role: 'Student Counsellor',
  image: { src: '/images/wellbeing-counsellor.webp', width: 575, height: 981, alt: 'Hafsa Ali, ICV student counsellor' },
  credentials: ['Diploma of Community Services', 'Diploma of Counselling', 'Working towards social work'],
  paragraphs: [
    'Embracing a holistic approach to student well-being, Hafsa Ali joins our team at International College of Victoria with a steadfast commitment to fostering a supportive and inclusive environment for all students. With a background in community services and counselling, she brings a nuanced understanding of the challenges and opportunities that accompany the college experience.',
    'As a trusted resource on campus, Hafsa is here to assist you in navigating the complexities of college life, offering confidential support tailored to your individual needs.',
    'With a warm and empathetic approach, Hafsa strives to create a safe space where students feel heard, valued, and empowered to pursue their goals, equipping them with the tools and strategies they need to thrive academically, emotionally, and socially.',
    'Whether you’re facing challenges or celebrating successes, she is here to support you every step of the way. We encourage you to reach out, connect, and take advantage of the resources available to you.',
  ],
  topicsTitle: 'She can help with',
  topics: ['Academic concerns', 'Managing stress', 'Navigating relationships', 'Exploring personal identity'],
  formatsTitle: 'How support is offered',
  formats: ['One-on-one sessions', 'Workshops', 'Outreach programs'],
}

export const wellbeingContent = {
  eyebrow: 'Wellbeing',
  title: 'Student Wellbeing',
  highlight: 'Centre',
  paragraphs: [
    'We offer comprehensive student support services, including counselling. Our experienced counsellors provide a confidential and supportive environment where students can explore personal, academic, and emotional concerns.',
    'Whether facing academic challenges, adjusting to a new environment, or navigating life’s complexities, our counselling services are here to assist students in reaching their full potential. We prioritise the mental health and happiness of our students, ensuring they have the resources and support they need to thrive academically and personally.',
  ],
  image: {
    src: '/images/wellbeing-students-1500.webp',
    srcSet: '/images/wellbeing-students-750.webp 750w, /images/wellbeing-students-1500.webp 1500w',
    alt: 'Group of smiling ICV students holding books',
  },
  action: { label: 'Learn more', to: '/about' },
}
