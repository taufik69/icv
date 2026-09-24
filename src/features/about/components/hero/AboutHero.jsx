import { heroContent as content } from '@/features/about/data/aboutContent'
import { PageHero } from '@/shared/components/layout'
import { HeroStats } from './HeroStats'

// Banner = the icv.edu.au/about header photo, plus a key-facts strip.
export function AboutHero() {
  return (
    <PageHero id="about-title" current="About us" {...content}>
      <HeroStats stats={content.stats} />
    </PageHero>
  )
}
