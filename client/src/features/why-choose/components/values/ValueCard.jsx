import { PlusCard } from '@/shared/components/ui'

// Blueprint cell (as on course Employment): icon tile on top (fills white on hover), title + line below.
export function ValueCard({ item: { title, text, Icon } }) {
  return (
    <PlusCard className="flex h-full flex-col gap-5">
      <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition group-hover/plus:bg-white group-hover/plus:text-secondary">
        <Icon className="size-5" />
      </span>
      <div>
<<<<<<< HEAD
        <h3 className="text-lg text-white transition-colors duration-500 group-hover:text-on-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70 max-md:text-justify max-md:hyphens-auto transition-colors duration-500 group-hover:text-on-primary/80">
          {text}
        </p>
=======
        <h3 className="text-xl leading-snug text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/90">{text}</p>
>>>>>>> devlopement
      </div>
    </PlusCard>
  )
}
