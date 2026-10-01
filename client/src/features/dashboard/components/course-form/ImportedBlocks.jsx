import { courseFormBlocks } from '../../data/courseFormBlocks'

// Edit page only: lists the extra blocks this course's page has that the form can't edit yet (copied from
// icv.edu.au), so staff know saving keeps them. Renders nothing when the course has none (e.g. a new course).
export function ImportedBlocks({ course }) {
  const blocks = courseFormBlocks.filter((b) => !b.editable && course?.[b.id])
  if (!blocks.length) return null
  return (
    <section id="imported" aria-labelledby="imported-title" className="scroll-mt-28 rounded-2xl bg-surface-muted px-5 py-5 ring-1 ring-line sm:px-7">
      <h2 id="imported-title" className="text-lg">Also on this course page</h2>
      <p className="mt-1 text-sm text-ink-muted">
        These blocks were copied word for word from icv.edu.au and can't be edited here yet. Saving keeps them as they are.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {blocks.map(({ id, label }) => (
          <li key={id} id={id} className="scroll-mt-28 rounded-pill bg-surface px-3 py-1 text-sm text-secondary ring-1 ring-line">{label}</li>
        ))}
      </ul>
    </section>
  )
}
