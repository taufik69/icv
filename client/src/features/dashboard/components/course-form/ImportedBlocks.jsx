import { courseFormBlocks } from '../../data/courseFormBlocks'

// Verbatim page blocks this form doesn't edit yet. Saving keeps them exactly as they are.
export function ImportedBlocks({ course }) {
  const blocks = courseFormBlocks.filter((b) => !b.editable)
  return (
    <section id="imported" aria-labelledby="imported-title" className="scroll-mt-28 rounded-2xl border-2 border-dashed border-line px-5 py-5 sm:px-7">
      <h2 id="imported-title" className="text-lg">Page copy from icv.edu.au</h2>
      <p className="mt-0.5 text-sm text-ink-muted">These blocks show on the course page word for word. Saving this form keeps them unchanged.</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {blocks.map(({ id, label }) => {
          const on = Boolean(course?.[id])
          return (
            <li key={id} id={id} className={`rounded-pill px-3 py-1 text-sm ring-1 ${on ? 'bg-primary-soft text-secondary ring-primary/40' : 'text-ink-subtle ring-line'}`}>
              {label}{on ? '' : ' (none)'}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
