import { pageHero } from './hero'

// Copy from icv.edu.au/information-for-students-2/ (Life, Getting Around, Living Cost; Orientation + links in intlSupport.js).
export const intlHero = pageHero('International Student', 'Information')

export const lifeSection = {
  id: 'life-in-melbourne',
  title: 'Life in Melbourne',
  paragraphs: [
    'Melbourne is the capital of the state of Victoria and Australia’s second largest city with a population of 4.8 million people. The Economist Intelligence Unit (EIU) has ranked Melbourne as the World’s most liveable city. Melbourne takes top spot for the seventh year, receiving a perfect score for healthcare, education, and infrastructure.',
    'International students have consistently voted Melbourne as one of the world’s best study destinations — and we’re sure you’re going to LOVE living in this vibrant city! Melbourne is Australia’s most multicultural and ethnically diverse city. People from over 140 countries call Melbourne home, and locals are welcoming and respectful of all cultures and traditions.',
    'ICV is proud to offer a purpose-built practical training campus in Lalor for our Carpentry students and a theory campus in the Heart of CBD (Collins Street). The practical facility is fully equipped with all the tools, materials, and resources students need to gain real-world, hands-on experience throughout the course.',
    'Melbourne’s diversity is reflected in its thousands of restaurants, cafés and bars. It is known for its strong café culture and has earned the title of Australia’s food and wine capital. The city celebrates this passion with numerous food and wine festivals held year-round.',
    'Notable for its mix of historic Victorian-era buildings and modern architecture, Melbourne also offers beautiful beaches, lush parks, and open spaces — all contributing to a clean, safe, and friendly environment. Melbourne’s central city area is famous for its laneways which feature ‘hidden gems’ in the way of food outlets and shopping. It is a city where a sense of adventure and curiosity will always be rewarded.',
    'Australia is often said to be “sport mad” and nowhere more so than in Melbourne. The city is home to some of Australia’s most significant cultural and sporting institutions. From soccer to cricket and golf to rugby and tennis events – the world’s sporting stage is at our doorstep. The Melbourne Cricket Ground (MCG) is the ‘spiritual’ home of Aussie Rules (AFL) football. Culturally, there is always a wide variety of Broadway musicals, concerts, plays, live music, comedy and theatre. Live bands frequently do ‘gigs’ at local pubs, so there’s never a dull night with the city’s live entertainment offerings.',
  ],
  images: [
    { src: '/images/students-melbourne.webp', width: 612, height: 408, alt: 'Melbourne’s skyline at dusk over the Yarra River', caption: 'Melbourne’s skyline at dusk.' },
    {
      src: '/images/students-skyline-900.webp',
      srcSet: '/images/students-skyline-480.webp 480w, /images/students-skyline-900.webp 900w',
      sizes: '(min-width: 1280px) 320px, 45vw',
      width: 900,
      height: 1359,
      alt: 'A Melbourne tram passing Flinders Street Station',
    },
  ],
}

export const transportSection = {
  id: 'getting-around',
  title: 'Getting Around Melbourne',
  paragraphs: [
    'Melbourne’s trains, trams and buses are an easy way to see all of the city’s best attractions, access sporting venues, tourist and shopping precincts and, of course, get to and from class. All public transported services are accessible by a single prepaid ‘smart’ card called myki. Train, bus and tram services run from early morning to very late at night – making it easy to get there and back on time! Melbourne has the largest tram network in the world. Its trams are recognised as iconic cultural assets and are a unique transport experience for any visitor to the city.',
    'Melbourne’s (Tullamarine) international airport is located approximately 20 km from the city centre. A Skybus service operates between the airport and downtown Melbourne with departures in each direction every 10 – 15 minutes.',
  ],
}

export const costSection = {
  id: 'living-cost',
  title: 'Living Cost',
  text: 'Knowing the average living costs in Australia is an important part of your financial preparation. To get a better idea, check out the handy Cost of Living Calculator by Study Australia',
  action: { label: 'Cost of Living Calculator', href: 'https://www.studyaustralia.gov.au/en/life-in-australia/living-and-education-costs' },
  // "Student Handbook (International Students)" links to the published handbook PDF.
  handbook: {
    text: ['For further details about this refer to the ', 'Student Handbook (International Students)'],
    href: 'https://icv.edu.au/wp-content/uploads/2025/07/Student-Handbook-International-V3.1-effective-July-2025-1.pdf',
  },
}
