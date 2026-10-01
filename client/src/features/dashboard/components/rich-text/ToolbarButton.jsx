// One toolbar toggle. `active` shows the current formatting; mouse-down is prevented so the editor keeps its selection.
export function ToolbarButton({ label, icon: Icon, active, disabled, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-lg text-ink-muted transition hover:bg-surface hover:text-secondary disabled:pointer-events-none disabled:opacity-35 aria-pressed:bg-secondary aria-pressed:text-white"
    >
      <Icon className="size-4.5" />
    </button>
  )
}
