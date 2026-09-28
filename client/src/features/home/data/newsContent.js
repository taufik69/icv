const ICV = 'https://icv.edu.au'
const post = (title, date, excerpt, path, image) => ({ title, date, excerpt, href: `${ICV}${path}`, image: `/images/${image}.webp` })

export const newsContent = {
  eyebrow: 'Latest news',
  title: 'Our latest',
  highlight: 'news',
  intro: 'Career guides, industry updates and advice for students planning their next step.',
  featured: post(
    'What Skills Will I Learn in Building & Construction Courses?',
    'February 8, 2024',
    'Building and construction certificates, or a Diploma of Building and Construction are the most common choices for many tradies looking to range their skills and open new career pathways.',
    '/what-skills-will-i-learn-in-building-construction-courses/',
    'news-construction-skills',
  ),
  posts: [
    post('How to Become a Construction Project Manager in Australia?', 'December 6, 2023',
      'Are you a problem-solver, a leader, and thrive in dynamic environments? If so, then becoming…',
      '/how-to-become-a-construction-project-manager-in-australia/', 'news-project-manager'),
    post('Albanese Allocates $318m For Extended COVID-19 Support in Aged Care Sector', 'November 1, 2023',
      'The Albanese government is the federal executive government of Australia, allocating $318 million to extend…',
      '/albanese-allocates-318m-for-extended-covid-19-support-in-aged-care-sector/', 'news-aged-care-support'),
    post('Build Your Future with A Carpentry Apprenticeship in Australia', 'October 16, 2023',
      'The Certificate III in Carpentry must be completed as part of an apprenticeship, and upon…',
      '/build-your-future-with-a-carpentry-apprenticeship-in-australia/', 'news-carpentry-apprenticeship'),
  ],
}
