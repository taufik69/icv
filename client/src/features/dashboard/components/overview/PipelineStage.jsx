import { ArrowRightIcon, CloseIcon } from '@/shared/components/icons'

// One status in the pipeline grid: its colour key, name (stages numbered 1–4, exits marked with ×),
// count and share. Text stays in ink; only the small key carries the colour.
export function PipelineStage({ label, bg, step, count, share, exit }) {
  return (
    <li className={`rounded-xl p-3 ring-1 ${exit ? 'bg-surface ring-line-soft' : 'bg-surface-alt ring-line-soft'}`}>
      <p className="flex items-center gap-2 text-xs text-ink-subtle">
        <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-xs ${bg}`} />
        {exit ? <CloseIcon aria-hidden="true" className="size-3" /> : <span className="font-semibold">{step}</span>}
        <span className="truncate">{label}</span>
      </p>
      <p className="mt-1.5 flex items-baseline gap-1.5">
        <span className="font-heading text-xl font-bold text-ink-strong">{count}</span>
        <span className="text-xs text-ink-subtle">{share}%</span>
        {!exit && step < 4 && <ArrowRightIcon aria-hidden="true" className="ml-auto size-3.5 text-ink-disabled" />}
      </p>
    </li>
  )
}
