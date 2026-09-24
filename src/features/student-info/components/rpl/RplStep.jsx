import { ChevronDownIcon } from '@/shared/components/icons'

// One step on the vertical timeline (phones drop the number rail; the step label already reads "Step one…"): native <details> accordion (keyboard + screen-reader friendly, no JS).
export function RplStep({ step, index, last }) {
  return (
    <li className="relative sm:pl-16 md:pl-20">
      {!last && <span aria-hidden="true" className="absolute top-14 bottom-0 left-6 hidden w-0.5 sm:block bg-linear-to-b from-primary to-line md:left-7" />}
      <span className="absolute top-2 left-0 hidden size-12 place-items-center rounded-full bg-secondary font-heading text-lg sm:grid font-extrabold text-primary shadow-brand ring-4 ring-surface md:size-14">
        {index + 1}
      </span>

      <details open={index === 0} className="group mb-6 rounded-2xl bg-surface-muted/60 ring-1 ring-line-soft open:bg-surface open:shadow-card">
        <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:gap-4 sm:p-5 md:p-6 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1">
            <span className="block font-condensed text-sm font-bold tracking-[0.2em] text-primary-hover uppercase">{step.label}</span>
            <span className="mt-1 block font-heading text-lg font-bold sm:text-xl text-secondary">{step.title}</span>
          </span>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-line transition group-open:rotate-180 group-open:bg-primary group-open:ring-primary">
            <ChevronDownIcon className="size-5 text-secondary" />
          </span>
        </summary>
        <div className="space-y-3 px-4 pb-6 leading-relaxed text-ink-muted sm:px-5 md:px-6">
          {step.paragraphs.map((text) => (
            <p key={text.slice(0, 32)}>{text}</p>
          ))}
          {step.note && (
            <p className="rounded-xl bg-primary-soft px-4 py-3 text-secondary">
              <strong>Note:</strong> {step.note}
            </p>
          )}
        </div>
      </details>
    </li>
  )
}
