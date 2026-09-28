import { PhotoFrame } from '@/shared/components/ui'

// Shared PhotoFrame plus a floating "since" badge over the bottom-left corner.
export function HistoryMedia({ image, badge }) {
  return (
    <div className="relative mb-6">
      <PhotoFrame image={image} />
      <div className="absolute -bottom-2 left-5 rounded-2xl bg-secondary px-6 py-4 shadow-brand ring-4 ring-surface sm:left-8">
        <p className="font-heading text-4xl font-extrabold text-primary">{badge.value}</p>
        <p className="font-condensed text-xs tracking-[0.2em] text-white/75 uppercase">{badge.label}</p>
      </div>
    </div>
  )
}
