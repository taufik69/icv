import { SectionEyebrow } from '@/shared/components/ui'
import { CeoQuote } from './CeoQuote'

// The letter itself: greeting, body, pull quote, sign-off with a script-style signature.
export function CeoLetter({ letter, profile }) {
  return (
    <article className="relative rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-12">
      <SectionEyebrow accent="muted">Welcome to ICV</SectionEyebrow>
      <h2 id="ceo-letter-title" className="mt-5 text-3xl leading-tight md:text-4xl">
        {letter.title}
      </h2>

<<<<<<< HEAD
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted max-md:text-justify max-md:hyphens-auto">
=======
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-secondary/90">
>>>>>>> devlopement
        <p className="font-heading text-xl font-semibold text-secondary">{letter.greeting}</p>
        <p className="font-semibold text-secondary">{letter.intro}</p>
        {letter.paragraphs.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}
      </div>

      <CeoQuote quote={letter.quote} />

<<<<<<< HEAD
      <p className="text-lg leading-relaxed text-ink-muted max-md:text-justify max-md:hyphens-auto">{letter.closing}</p>
=======
      <p className="text-lg leading-relaxed text-secondary/90">{letter.closing}</p>
>>>>>>> devlopement

      <footer className="mt-10 flex items-center gap-4 border-t border-line-soft pt-8">
        <img
          src={profile.image.src}
          alt=""
          width="56"
          height="56"
          loading="lazy"
          decoding="async"
          className="size-14 rounded-full object-cover ring-2 ring-secondary/20 ring-offset-2"
        />
        <div>
          <p className="text-sm text-secondary-muted">{letter.signOff}</p>
          <p className="font-heading text-2xl font-bold text-secondary italic">{profile.name}</p>
          <p className="font-condensed text-xs tracking-[0.2em] text-secondary-muted uppercase">
            {profile.role} · {profile.org}
          </p>
        </div>
      </footer>
    </article>
  )
}
