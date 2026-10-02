import { useState } from 'react'
import { ImageIcon, TrashIcon } from '@/shared/components/icons'
import { shrinkImage } from '../../../lib/shrinkImage'
import { PreviewButton } from './preview/PreviewButton'

// The paper form's "Agent's Stamp" box: the agent adds a photo or scan of their stamp, shown inside the
// box. Scaled down and kept in the draft (`agentStamp`, a data URL), like the student's signature.
export function AgentStamp({ value, onChange, className = '' }) {
  const [problem, setProblem] = useState('')
  const pick = async (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    try {
      onChange({ target: { value: await shrinkImage(file, 600, 300) } })
      setProblem('')
    } catch {
      setProblem('This image could not be read. Try another photo.')
    }
  }

  return (
    <div className={className}>
      <p id="agent-stamp-label" className="font-heading text-sm font-semibold text-secondary">Agent's stamp</p>
      <div className="mt-1.5 flex flex-wrap items-start gap-3">
        <label className="relative grid h-36 w-full max-w-sm cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-secondary bg-surface transition hover:bg-surface-alt has-focus-visible:shadow-focus-success">
          <span className="absolute right-3 top-2 text-sm text-ink-disabled">Agent's Stamp</span>
          {value ? (
            <img src={value} alt="Agent's stamp" className="max-h-28 max-w-[85%] object-contain" />
          ) : (
            <span className="flex flex-col items-center gap-1.5 text-center text-sm text-ink-subtle">
              <ImageIcon className="size-6 text-secondary-muted" />
              Add a photo or scan of the stamp
            </span>
          )}
          <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={pick} aria-labelledby="agent-stamp-label" className="sr-only" />
        </label>
        {value && <PreviewButton src={value} name="Agent's stamp" />}
        {value && (
          <button type="button" onClick={() => onChange({ target: { value: '' } })}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm font-semibold bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white">
            <TrashIcon className="size-4" /> Remove
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-ink-subtle">JPG or PNG. Leave blank if you are not applying through an agent.</p>
      {problem && <p role="alert" className="mt-1 text-sm text-danger-ink">{problem}</p>}
    </div>
  )
}
