import { CoursesSection } from './courses/CoursesSection'
import { CareersCta } from './cta/CareersCta'
import { Hero } from './hero/Hero'
import { LaunchSection } from './launch/LaunchSection'
import { IntroSection } from './intro/IntroSection'
import { NewsSection } from './news/NewsSection'
import { TestimonialsSection } from './testimonials/TestimonialsSection'
import { WelcomeSection } from './welcome/WelcomeSection'
import { WhyChooseSection } from './why/WhyChooseSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <CoursesSection />
      <CareersCta />
      <WhyChooseSection />
      <WelcomeSection />
      <NewsSection />
      <TestimonialsSection />
      <LaunchSection />
    </>
  )
}
