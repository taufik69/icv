import { Reveal } from '@/shared/components/ui'

// Glass tile on navy; the icon circle flips to green on hover.
export function WhyPoint({ point: { label, Icon }, delay }) {
  return (
    <Reveal as="li" delay={delay}>
      <div className="group flex h-full items-center gap-4 rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-primary/50">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-on-primary">
          <Icon className="size-5" />
        </span>
        <span className="font-heading text-sm font-semibold text-white md:text-base">{label}</span>
      </div>
    </Reveal>
  )
}
