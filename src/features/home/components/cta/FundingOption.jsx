import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

// Glass card for one funding route: photo strip, green tag, title, arrow that fills on hover.
export function FundingOption({ option }) {
  const { Icon } = option

  return (
    <AppLink
      to={option.to}
      className="group flex items-center gap-4 rounded-3xl bg-white/10 p-3 text-white ring-1 ring-white/15 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:text-white sm:gap-5"
    >
      <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24">
        <img
          src={option.image}
          alt=""
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute bottom-1.5 left-1.5 grid size-8 place-items-center rounded-lg bg-primary text-on-primary shadow-card">
          <Icon className="size-4" />
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="inline-block rounded-pill bg-primary/20 px-2.5 py-0.5 font-condensed whitespace-nowrap text-xs font-bold tracking-wider text-primary uppercase">
          {option.tag}
        </span>
        <span className="mt-1.5 block font-heading text-lg leading-snug font-bold sm:text-xl">{option.title}</span>
      </span>
      <span className="mr-2 grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-white/30 transition duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:ring-primary">
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </AppLink>
  )
}
