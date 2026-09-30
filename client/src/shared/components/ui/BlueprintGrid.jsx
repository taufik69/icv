import { GridBeams } from './GridBeams'

// Faint 48px blueprint grid with dots at the crossings and light beams running along its lines, fading out
// from the top-left. Drop it inside a dark `relative isolate overflow-hidden` hero, after the scrims.
export function BlueprintGrid() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 mask-radial-from-25% mask-radial-to-85% mask-radial-at-top-left">
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-white)_1px,transparent_1px),linear-gradient(90deg,var(--color-white)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-white)_1.5px,transparent_1.5px)] bg-size-[48px_48px] bg-position-[-23.5px_-23.5px] opacity-30" />
      <GridBeams />
    </div>
  )
}
