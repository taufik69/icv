import { LinkedinIcon } from '@/shared/components/icons'
import { PhotoFrame } from '@/shared/components/ui'

// Portrait in the shared PhotoFrame, then name / role and a LinkedIn link.
export function CeoProfileCard({ profile }) {
  const { image } = profile

  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line-soft lg:max-w-none">
      <PhotoFrame image={image} aspect="aspect-square" className="mt-2 ml-2" />

      <div className="mt-8 text-center">
        <p className="font-heading text-2xl font-bold text-secondary">{profile.name}</p>
        <p className="mt-1 font-condensed text-sm tracking-[0.2em] text-primary-hover uppercase">{profile.role}</p>
        <p className="mt-1 text-sm text-ink-subtle">{profile.org}</p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mt-5 inline-flex items-center gap-2 rounded-pill bg-secondary px-5 py-2.5 font-heading text-sm font-semibold text-white shadow-brand transition hover:bg-secondary-dark hover:text-white"
        >
          <LinkedinIcon className="size-4" />
          Connect on LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
