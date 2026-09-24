import { useState } from 'react'
import { Container, PhotoFrame, Reveal } from '@/shared/components/ui'
import { Parts } from '../common/Parts'
import { UnitList } from './UnitList'

// Packaging rules + photo on the left; Core / Elective units as tabs on the right.
export function UnitsSection({ units, image }) {
  const tabs = [
    { id: 'core', label: 'Core Units', items: units.core },
    { id: 'elective', label: 'Elective units', items: units.elective },
  ]
  const [active, setActive] = useState('core')
  const current = tabs.find((t) => t.id === active)

  return (
    <section aria-labelledby="units-title" className="bg-surface py-16 md:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <Reveal from="left" className="lg:sticky lg:top-28">
          <h2 id="units-title" className="text-3xl leading-tight md:text-4xl">{units.title}</h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />
          <div className="mt-6">
            <Parts parts={units.parts} />
          </div>
          <div className="mt-8 hidden lg:block">
            <PhotoFrame image={{ ...image, sizes: '460px' }} />
          </div>
        </Reveal>

        <Reveal from="right" delay={100} className="min-w-0">
          <div role="tablist" aria-label={units.title} className="inline-flex rounded-2xl bg-surface-muted p-1.5 ring-1 ring-line-soft">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="units-panel"
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-heading text-sm font-semibold transition ${active === t.id ? 'bg-secondary text-white shadow-brand' : 'text-secondary hover:bg-surface'}`}
              >
                {t.label}
                <span className={`rounded-pill px-2 text-xs ${active === t.id ? 'bg-primary text-on-primary' : 'bg-surface text-ink-subtle'}`}>{t.items.length}</span>
              </button>
            ))}
          </div>
          <div role="tabpanel" id="units-panel" aria-labelledby={`tab-${active}`} className="mt-6">
            <UnitList key={active} items={current.items} />
          </div>
          {units.note && <p className="mt-6 rounded-2xl border-l-4 border-primary bg-primary-soft px-5 py-4 leading-relaxed text-secondary">{units.note}</p>}
        </Reveal>
      </Container>
    </section>
  )
}
