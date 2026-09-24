// Shared banner for Student Info pages: same photo as the About pages, title from the icv.edu.au page.
const image = {
  src: '/images/about-banner-1500.webp',
  srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
  width: 1500,
  height: 650,
  alt: 'Smiling ICV students holding books and notes',
}

export const pageHero = (title, highlight) => ({ eyebrow: 'Student Info', title, highlight, image })
