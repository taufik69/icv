// "C, D" → "C and D", "L, M, N" → "L, M and N"
const spell = (sections) => {
  const letters = sections.split(', ')
  return letters.length < 2 ? letters[0] : `${letters.slice(0, -1).join(', ')} and ${letters.at(-1)}`
}

// Top of the open step: the paper form's section letters on a navy tile (so a student holding the PDF
// can find their place), the step count, title and one-line lead.
export function StepHeader({ step, total, current }) {
  const plural = current.sections.includes(',')
  return (
    <header className="flex items-start gap-4 border-b border-line-soft pb-7 sm:gap-5">
      <span aria-hidden="true" className="grid h-12 min-w-12 shrink-0 place-items-center rounded-2xl bg-secondary px-3 font-heading text-lg font-bold tracking-wider text-white sm:h-14 sm:min-w-14 sm:text-xl">
        {current.sections.replaceAll(', ', ' ')}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-ink-subtle">
          Step {step + 1} of {total}. Section{plural && 's'} {spell(current.sections)} of the paper form.
        </p>
        <h2 id="enrol-step-title" className="mt-1 text-2xl leading-tight sm:text-3xl">{current.title}</h2>
        <p className="mt-1.5 text-ink-muted">{current.lead}</p>
      </div>
    </header>
  )
}
