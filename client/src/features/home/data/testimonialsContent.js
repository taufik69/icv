const review = (name, source, headline, quote, course, image) => ({ name, source, headline, quote, course, image: `/images/${image}.webp` })

export const testimonialsContent = {
  title: 'Our students',
  highlight: 'love us',
  reviews: [
    review('Shibin P Chacko', 'Google', 'I wholeheartedly recommend this institute',
      'I am enrolled in the Disability Certificate IV course with ICA, and my instructor is Ms. Kritika. She ensured that all students comprehended the content and stayed informed, which I deeply valued. I wholeheartedly recommend this institute to others. Furthermore, I extend my appreciation to Alisha and Mehak Puri for their swift assistance with administrative matters.',
      'Certificate IV in Disability', 'course-disability'),
    review('Grace Carag', 'Facebook', 'So grateful that I enrolled here',
      'I am a current student of this school taking Certificate 111 of childcare. I am so grateful that I enrolled here. Staffs and teachers are very welcoming, friendly, helpful and supportive. Highly recommended to everyone.',
      'Certificate III in Childcare', 'course-ecec-cert3'),
    review('Peggy Hsu', 'Google', 'Taught with such patience',
      'I want to express my sincere gratitude for teaching us about disability nursing with such patience. Not only did you deliver the lessons with great patience, but you also provided us with abundant resources to enhance our understanding. Thank you for your dedication and support.',
      'Disability studies', 'course-disability'),
    review('Chanel LEE', 'Google', 'A good environment and good service',
      'The school has a good environment and good service. My Favorita training teacher is Kritika. She is humorous and fun. The class is not too boring, and she is also very patient to teach us. She’s quick to help and answer your questions. She is a great teacher.',
      'ICV student', 'course-ecec-diploma'),
    review('Sophie Conci', 'Google', 'This is the school to enrol',
      'Currently studying at ICV completing Certificate IV in Disability. A huge thankyou to Kritika with a fantastic job she has done teaching our class. She is thoughtful, helpful, considerate and most of all compassionate in what she does. If your thinking of studying then this is the school to enrol.',
      'Certificate IV in Disability', 'course-ageing'),
  ],
}
