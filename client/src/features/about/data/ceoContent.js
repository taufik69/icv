// Copy from icv.edu.au/weclome-message-from-ceo/ (portrait re-encoded to WebP).
export const ceoHeroContent = {
  eyebrow: 'Leadership',
  title: 'Welcome message from the',
  highlight: 'CEO',
  lead: 'A personal welcome from the Chief Executive Officer of International College of Victoria.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const ceoProfile = {
  name: 'Alisha Puri',
  role: 'Chief Executive Officer',
  org: 'International College of Victoria',
  image: { src: '/images/ceo-alisha-puri.webp', width: 350, height: 350, alt: 'Alisha Puri, CEO of International College of Victoria' },
  linkedin: 'https://au.linkedin.com/in/alisha-puri-6b980813a',
}

export const ceoLetter = {
  title: 'Message from the Chief Executive Officer',
  greeting: 'Dear Future Leaders,',
  intro: 'Thank you for your interest in International College of Victoria!',
  paragraphs: [
    'I am thrilled to extend a heartfelt welcome to all visitors to our website. As the CEO, I am honoured to lead an institution dedicated to fostering academic excellence and cultural diversity for both our domestic and international students.',
    'At ICV, we believe in providing a transformative educational experience that prepares students to thrive in an interconnected world.',
    'Whether you are a prospective student, parent, faculty member, or community partner we aim to provide the best possible support in helping you achieve your dream career.',
    'From our innovative academic programs to our supportive community atmosphere, ICV is committed to empowering individuals to reach their fullest potential and make a positive impact in society.',
  ],
  quote: {
    lead: 'There is a great saying by Ella Fitzgerald that embodies our value system:',
    text: 'It isn’t where you came from, it’s where you are going that counts.',
    author: 'Ella Fitzgerald',
  },
  closing: 'Thank you for considering ICV for your educational journey. We look forward to welcoming you into our community and supporting you in achieving your goals.',
  signOff: 'Warm regards,',
}

export const ceoCta = {
  title: 'Where are you going next?',
  text: 'Take the first step towards your dream career with nationally recognised training in Melbourne.',
  primary: { label: 'Enquire now', href: 'https://icv.edu.au/enquire-now/' },
  secondary: { label: 'About ICV', to: '/about' },
}
