import { SectionEyebrow } from '@/shared/components/ui'
import { CeoQuote } from './CeoQuote'

// The letter itself: greeting, body, pull quote, sign-off with a script-style signature.
export function CeoLetter({ letter, profile }) {
  return (
    <article className="relative rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-12">
      <SectionEyebrow>Welcome to ICV</SectionEyebrow>
      <h2 id="ceo-letter-title" className="mt-5 text-3xl leading-tight md:text-4xl">
        {letter.title}
      </h2>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
        <p className="font-heading text-xl font-semibold text-secondary">{letter.greeting}</p>
        <p className="font-semibold text-ink">{letter.intro}</p>
        {letter.paragraphs.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}
      </div>

      <CeoQuote quote={letter.quote} />

      <p className="text-lg leading-relaxed text-ink-muted">{letter.closing}</p>

      <footer className="mt-10 flex items-center gap-4 border-t border-line-soft pt-8">
        <img
          src={profile.image.src}
          alt=""
          width="56"
          height="56"
          loading="lazy"
          decoding="async"
          className="size-14 rounded-full object-cover ring-2 ring-primary ring-offset-2"
        />
        <div>
          <p className="text-sm text-ink-subtle">{letter.signOff}</p>
          <p className="font-heading text-2xl font-bold text-secondary italic">{profile.name}</p>
          <p className="font-condensed text-xs tracking-[0.2em] text-ink-subtle uppercase">
            {profile.role} · {profile.org}
          </p>
        </div>
      </footer>
    </article>
  )
}
