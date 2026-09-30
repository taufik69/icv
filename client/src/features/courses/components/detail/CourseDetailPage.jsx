import { Container } from '@/shared/components/ui'
import { detailContent as content } from '../../data/detailContent'
import { finderContent } from '../../data/finderContent'
import { careerTitles, entryRequirements, feeRows, marketsFor, relatedCourses, studyPathways, unitList } from '../../lib/courseDetail'
import { Parts } from '../common/Parts'
import { CareerPanel } from './CareerPanel'
import { CourseSidebar } from './CourseSidebar'
import { CourseSections } from './CourseSections'
import { DetailHero } from './DetailHero'
import { FeeTiles } from './FeeTiles'
import { OverviewPhoto } from './OverviewPhoto'
import { RelatedCourses } from './RelatedCourses'
import { UnitsGrid } from './UnitsGrid'

// /courses/$market/$slug: navy photo hero, then all sections under sticky scroll tabs on the left and the shared sidebar on the
// right (lg+: its card rises over the hero edge and stays sticky). Phones: hero, sidebar, tabs. UI only.
export function CourseDetailPage({ course, summary, catalogue }) {
  const units = unitList(course.units)
  const entry = entryRequirements(course)
  const fees = feeRows(course)
  const careers = careerTitles(course)
  const pathways = studyPathways(course)
  const related = relatedCourses(summary, catalogue)
  const { titles } = content

  const panels = {
    overview: {
      title: titles.overview,
      content: (
        <>
          {course.images.overview && <OverviewPhoto image={course.images.overview} />}
          <Parts parts={course.overview.paragraphs} accent="navy" />
        </>
      ),
    },
    units: units?.length && { count: units.length, title: titles.units, content: <UnitsGrid units={units} /> },
    entry: entry && { title: titles.entry, content: <Parts parts={entry} accent="navy" /> },
    fees: fees.length > 0 && { title: titles.fees, content: <FeeTiles rows={fees} note={content.feesNote} /> },
    careers: (careers.length > 0 || pathways) && {
      title: titles.careers,
      content: <CareerPanel careers={careers} pathways={pathways} titles={titles} />,
    },
  }
  const tabs = content.tabs.filter((t) => panels[t.id]).map((t) => ({ ...t, ...panels[t.id] }))

  return (
    <>
      <DetailHero course={course} summary={summary} markets={marketsFor(course, catalogue)} content={content} />
      <div className="bg-surface-muted pb-20">
        <Container className="grid grid-cols-1 gap-x-12 gap-y-10 pt-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pt-10">
          <aside aria-label="Enrol" className="relative z-10 lg:col-start-2 lg:row-start-1 lg:-mt-80">
            <CourseSidebar course={summary} content={content.sidebar} />
          </aside>
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <CourseSections tabs={tabs} />
            {related.length > 0 && (
              <section aria-labelledby="related-title" className="mt-16 border-t border-line pt-12">
                <h2 id="related-title" className="text-2xl font-bold text-secondary md:text-3xl">{titles.related}</h2>
                <div className="mt-6">
                  <RelatedCourses courses={related} marketNames={finderContent.marketNames} />
                </div>
              </section>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}
