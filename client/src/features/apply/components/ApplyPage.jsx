import { PageHero } from '@/shared/components/layout'
import { Container } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { useApplyForm } from '../hooks/useApplyForm'
import { ApplyAside } from './ApplyAside'
import { ApplyForm } from './ApplyForm'
import { ApplySuccess } from './ApplySuccess'

const hero = {
  src: '/images/about-banner-1500.webp',
  srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
  width: 1500, height: 650,
  alt: 'Smiling ICV students holding books and notes',
}

// Local version of icv.edu.au/enquire-now/. `initial` comes from the URL (?course=CHC43015).
export function ApplyPage({ initial }) {
  const form = useApplyForm(initial)
  const [ref, doodle] = useDoodleBackground()

  return (
    <>
      <PageHero id="apply-page-title" grid current="Apply Now" title="Apply" highlight="Now" image={hero}
        lead="Tell us about yourself and the course you're interested in. Our admissions team will get back to you." />
      <section ref={ref} aria-label="Application form" className={`relative overflow-clip bg-surface-muted py-14 md:py-20 ${doodle}`}>
        <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
          <div className="min-w-0 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-10">
            {form.sent ? <ApplySuccess name={form.values.firstName} /> : <ApplyForm form={form} />}
          </div>
          <div className="lg:sticky lg:top-28">
            <ApplyAside courseCode={form.values.course} />
          </div>
        </Container>
      </section>
    </>
  )
}
