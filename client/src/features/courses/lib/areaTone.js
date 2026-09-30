// Colour per study area for badges on the dark course hero (full class strings so Tailwind sees them).
const tones = {
  'Building and Construction': { pill: 'bg-highlight/20 ring-highlight/45', dot: 'bg-highlight' },
  'Early Childhood': { pill: 'bg-sky/20 ring-sky/45', dot: 'bg-sky' },
  'Community Services': { pill: 'bg-coral/20 ring-coral/45', dot: 'bg-coral' },
  'White Card': { pill: 'bg-warning/20 ring-warning/45', dot: 'bg-warning' },
  Management: { pill: 'bg-accent/35 ring-accent/60', dot: 'bg-accent' },
}

export const areaTone = (area) => tones[area] ?? { pill: 'bg-white/10 ring-white/20', dot: 'bg-white' }
