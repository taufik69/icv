import { portalRoles } from '../data/portalContent'

// Two large tiles (radio group): who is signing in. The chosen tile turns navy.
export function RoleSwitch({ role, onChange }) {
  return (
    <div role="radiogroup" aria-label="I am a" className="grid grid-cols-2 gap-3">
      {Object.entries(portalRoles).map(([key, r]) => {
        const on = key === role
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(key)}
            className={`group flex cursor-pointer flex-col items-start gap-3 rounded-2xl p-4 text-left ring-1 transition duration-300 ${
              on ? 'bg-secondary text-white shadow-brand ring-secondary' : 'bg-surface text-secondary ring-line hover:ring-secondary/40'
            }`}
          >
            <span className={`grid size-10 place-items-center rounded-xl transition ${on ? 'bg-white/15' : 'bg-surface-muted'}`}>
              <r.Icon className="size-5" />
            </span>
            <span>
              <span className="block font-heading font-semibold">{r.label}</span>
              <span className={`mt-0.5 block text-xs leading-snug ${on ? 'text-white/85' : 'text-ink-subtle'}`}>{r.blurb}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
