import { useRef } from 'react'
import { PageHero } from '@/shared/components/layout'
import { Container } from '@/shared/components/ui'
import { useEnrolmentForm } from '../../hooks/useEnrolmentForm'
import { EnrolmentStepBar } from './EnrolmentStepBar'
import { EnrolmentStepForm } from './EnrolmentStepForm'
import { EnrolmentStepRail } from './EnrolmentStepRail'
import { EnrolmentSuccess } from './EnrolmentSuccess'

const hero = {
  src: '/images/about-banner-1500.webp',
  srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
  width: 1500, height: 650,
  alt: 'Smiling ICV students holding books and notes',
}

// Online version of the "Enrolment Application Form – International" (V8.0), one tab per part of the
// paper form. `course` comes from ?course= on course pages.
export function EnrolmentPage({ course }) {
  const topRef = useRef(null)
  const form = useEnrolmentForm(course, topRef)

  return (
    <>
      <PageHero id="enrol-page-title" current="Apply Now" title="Enrolment application" accent="muted" image={hero}
        lead="Apply for an international course at ICV. Your answers are saved on this device after each step, so you can finish later." />
      <section ref={topRef} aria-label="Enrolment application form" className="scroll-mt-24 [&_p]:text-left bg-surface-muted py-10 md:py-16">
        <Container className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          {form.submitted ? (
            <div className="min-w-0 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-10 lg:col-span-2">
              <EnrolmentSuccess values={form.values} receipt={form.receipt} onRestart={form.restart} />
            </div>
          ) : (
            <>
              <div className="lg:sticky lg:top-28">
                <EnrolmentStepRail form={form} />
                <EnrolmentStepBar form={form} />
              </div>
              <div className="min-w-0 rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line-soft sm:p-8 xl:p-10">
                <EnrolmentStepForm form={form} />
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
