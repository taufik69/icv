import { contactContent } from '@/features/contact/data/contactContent'
import { PageHero } from '@/shared/components/layout'
import { Container, Reveal } from '@/shared/components/ui'
import { contactCards } from '@/shared/config/footer'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { ContactCards } from './ContactCards'
import { EnquiryForm } from './EnquiryForm'
import { MapCard } from './MapCard'

export function ContactPage() {
  const [ref, doodle] = useDoodleBackground()
  const { hero, map } = contactContent
  const address = contactCards[0].lines[0]

  return (
    <>
      <PageHero id="contact-title" current={hero.title} title={hero.title} image={hero.image}>
        <div className="h-8 md:h-12" />
      </PageHero>
      <ContactCards />
      <section ref={ref} aria-label={contactContent.form.title} className={`relative overflow-clip bg-surface py-14 md:py-20 ${doodle}`}>
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Reveal from="left">
            <EnquiryForm />
          </Reveal>
          <Reveal from="right" delay={100} className="lg:sticky lg:top-28">
            <MapCard map={map} address={address} />
          </Reveal>
        </Container>
      </section>
    </>
  )
}
