import { ChevronDownIcon } from '@/shared/components/icons'
import { Reveal } from '@/shared/components/ui'
import { Parts } from '../common/Parts'

// Work placement copy: first paragraph always visible, the rest in a native <details> so the page stays scannable.
export function PlacementCard({ placement }) {
  const [first, ...rest] = placement.paragraphs

  return (
    <Reveal className="mt-6">
      <article className="rounded-3xl bg-secondary p-6 text-white shadow-brand md:p-10">
        {placement.title && <h3 className="font-condensed text-xl font-bold tracking-[0.2em] text-primary">{placement.title}</h3>}
        {placement.lead && <p className="mt-4 font-heading text-xl font-semibold text-white">{placement.lead}</p>}
        <p className="mt-4 leading-relaxed text-white/80">{first}</p>

        <details className="group mt-2">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-2 rounded-pill bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 [&::-webkit-details-marker]:hidden">
            <ChevronDownIcon className="size-4 text-primary transition group-open:rotate-180" />
            Read More
          </summary>
          <div className="mt-2">
            <Parts parts={rest} tone="dark" />
          </div>
        </details>

        {placement.list && (
          <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="font-heading font-semibold text-white">{placement.listTitle}</p>
            <Parts parts={[{ list: placement.list }]} tone="dark" />
          </div>
        )}
        {placement.note && <p className="mt-6 rounded-xl bg-primary px-4 py-3 font-semibold text-on-primary">{placement.note}</p>}
      </article>
    </Reveal>
  )
}
