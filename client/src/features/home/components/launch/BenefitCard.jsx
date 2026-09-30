import { PlusCard } from '@/shared/components/ui'

// Compact benefit row: icon tile beside the text (tile fills white on hover).
export function BenefitCard({ benefit: { text, Icon } }) {
  return (
    <PlusCard className="flex h-full items-center gap-4 p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition group-hover/plus:bg-white group-hover/plus:text-secondary">
        <Icon className="size-5" />
      </span>
      <h3 className="text-lg leading-snug text-white">{text}</h3>
    </PlusCard>
  )
}
