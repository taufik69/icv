import { PlusCard } from '@/shared/components/ui'

// Wide cell: title + RTO/CRICOS ids on the navy card, official AQF / NRT logos on a white plate (they're artwork on white).
export function RecognitionCard({ recognition }) {
  return (
    <PlusCard className="grid h-full items-center gap-6 md:grid-cols-[1fr_1.1fr] md:p-8">
      <div>
        <h3 className="text-xl leading-snug text-white md:text-2xl">{recognition.title}</h3>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {recognition.ids.map((id) => (
            <div key={id.label} className="rounded-lg bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <dt className="font-condensed text-xs tracking-widest text-white/60 uppercase">{id.label}</dt>
              <dd className="font-heading text-xl font-bold text-white">{id.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-lg bg-white p-5">
        <img
          src={recognition.image}
          alt={recognition.alt}
          width="600"
          height="160"
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </div>
    </PlusCard>
  )
}
