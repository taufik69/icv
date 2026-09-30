import { ArrowRightIcon } from '@/shared/components/icons'
import { PlusCard, SectionEyebrow } from '@/shared/components/ui'

// Tall intro cell: eyebrow on top, headline + copy + the section's one CTA pinned to the bottom.
export function LaunchIntro({ content }) {
  return (
    <PlusCard className="flex h-full flex-col justify-between gap-10 md:p-8">
      <SectionEyebrow tone="light" accent="muted" className="self-start">
        {content.eyebrow}
      </SectionEyebrow>
      <div>
        <h2 id="launch-title" className="text-3xl leading-tight text-white capitalize md:text-4xl">
          {content.title} {content.highlight}
        </h2>
        <div className="mt-5 space-y-3 leading-relaxed text-white/80">
          {content.paragraphs.map((t) => (
            <p key={t.slice(0, 20)}>{t}</p>
          ))}
        </div>
        <a
          href={content.action.href}
          className="group btn-shine mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
        >
          {content.action.label}
          <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </PlusCard>
  )
}
