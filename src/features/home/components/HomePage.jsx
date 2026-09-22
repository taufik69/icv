import { CoursesSection } from './courses/CoursesSection'
import { Hero } from './hero/Hero'
import { IntroSection } from './intro/IntroSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <CoursesSection />
    </>
  )
}
