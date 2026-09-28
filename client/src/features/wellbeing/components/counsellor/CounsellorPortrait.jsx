import { BadgeCheckIcon, HeartIcon } from '@/shared/components/icons'
import { PhotoFrame } from '@/shared/components/ui'

// Portrait in the shared PhotoFrame with a glass name plate; credentials listed below.
export function CounsellorPortrait({ content }) {
  const { image } = content

  const namePlate = (
    <>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-secondary-dark/70 to-transparent" />
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/15 px-5 py-4 ring-1 ring-white/25 backdrop-blur-md">
        <div>
          <p className="font-heading text-xl font-bold text-white">{content.name}</p>
          <p className="font-condensed text-xs tracking-[0.2em] text-primary uppercase">{content.role}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition duration-500 group-hover:scale-110">
          <HeartIcon className="size-5" />
        </span>
      </div>
    </>
  )

  return (
    <div className="mx-auto max-w-sm lg:max-w-none">
      <PhotoFrame image={image} aspect="aspect-4/5" imgClassName="object-top" overlay={namePlate} />

      <ul className="mt-8 space-y-2">
        {content.credentials.map((item) => (
          <li key={item} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-secondary shadow-raised ring-1 ring-line-soft">
            <BadgeCheckIcon className="size-5 shrink-0 text-primary-hover" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
