// Google reviews shown on icv.edu.au/testimonials/ (all 5 stars). Text is verbatim, typos included: don't edit reviewers' words.
const review = (name, date, text = '') => ({ name, date, text, rating: 5 })

export const heroContent = {
  eyebrow: 'Student voices',
  title: 'What our students',
  highlight: 'say',
  lead: 'Real reviews from ICV students on Google, about their trainers, their classes and their time with us.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const featured = {
  name: 'Pierre Hatungimana',
  course: 'Certificate IV in Disability',
  // Exact sentence from the review, split so the middle phrase can be highlighted.
  quote: ['I had a ', 'fantastic experience', ' taking the Disability Certificate IV course with Sonia Bhatia.'],
  date: '6 Mar 2024',
}

export const reviews = [
  review('Tisleena Kp', '12 Apr 2024', 'I am enrolled in the Disability Certificate IV course with ICA, and my instructor is Ms. Kritika. She has taught our class well and made sure we understood the topics taught. Thank you so much Ms Kritika! -Tisserent Kp'),
  review('Tiju George', '12 Apr 2024', "I'm currently doing the Certificate IV in Disability at ICV with Kritika as our instructor. She's been really supportive and patient with everyone in our class. Kritika has a lot of experience in support work and her teaching style is very effective. I definitely recommend .. Thanks"),
  review('Hardeep Kaur', '11 Apr 2024'),
  review('Sophie Conci', '24 Mar 2024', 'Currently studying at ICV completing Certificate IV in Disability. A huge thankyou to Kritika with a fantastic job she has done teaching our class. She is thoughtful, helpful, considerate and most of all compassionate in what she does. If your thinking of studying then this is the school to enrol…'),
  review('Daniel Fenollar', '23 Mar 2024', 'I am currently completing the Certificate IV in Disability at ICV with Kritika as our instructor. Kritika has been very supportive, patient and understanding to all the needs of our class. Her extensive expererience in the area of support as well as her teaching methods is a credit to her which makes it very easy for me to recommend her to anyone wanting to study under her guidance. Thankyou Kritika'),
  review('Chanel Lee', '14 Mar 2024', 'The school has a good environment and good service. My Favorita training teacher is Kritika. She is humorous and fun. The class is not too boring, and she is also very patient to teach us. She’s quick to help and answer your questions. She is a great teacher. I hope everything goes well for her.'),
  review('Pierre Hatungimana', '6 Mar 2024', 'I had a fantastic experience taking the Disability Certificate IV course with Sonia Bhatia. She made sure that all of her students understood the material and were kept up to date, which I really appreciated. I would highly recommend this course to anyone. Additionally, I want to express my gratitude to Alisha Puri for her prompt support with all administrative issues.'),
  review('Peggy Hsu', '6 Mar 2024', 'Dear Sonia, I want to express my sincere gratitude for teaching us about disability nursing with such patience. Not only did you deliver the lessons with great patience, but you also provided us with abundant resources to enhance our understanding. Thank you for your dedication and support.'),
]

export const shareCta = {
  eyebrow: 'Studied with us?',
  title: 'Share your',
  highlight: 'ICV story',
  text: 'Your review helps future students choose with confidence.',
}
