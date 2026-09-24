import { esosHero, esosSections } from '@/features/student-info/data/esosContent'
import { DocLayout } from '../common/DocLayout'
import { DocSection } from '../common/DocSection'
import { LinkCards } from '../common/LinkCards'
import { RichText } from '../common/RichText'

const IDS = esosSections.map((s) => s.id)

// Each topic is a card with a green rail; contact numbers become tap-to-call links, URLs become link tiles.
export function EsosPage() {
  return (
    <DocLayout id="esos-title" current="ESOS Framework" hero={esosHero} sections={esosSections} ids={IDS}>
      {esosSections.map((section, i) => (
        <DocSection key={section.id} section={{ ...section, items: [] }} number={i + 1}>
          {section.items?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label} className="rounded-2xl border-l-4 border-primary bg-surface-muted/60 p-5 ring-1 ring-line-soft md:p-6">
                  <h3 className="text-lg leading-snug">{item.label}</h3>
                  <div className="mt-3 space-y-3">
                    {item.paragraphs.map((parts, j) => (
                      <RichText key={j} parts={parts} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {section.links && <LinkCards links={section.links} cols="lg:grid-cols-3" />}
        </DocSection>
      ))}
    </DocLayout>
  )
}
