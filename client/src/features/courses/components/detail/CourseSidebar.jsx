import { EnrolCard } from './EnrolCard'
import { HelpCard } from './HelpCard'

// The common right-hand column of every course detail page; sticky beside the content on lg+.
export function CourseSidebar({ course, content }) {
  return (
    <div className="grid gap-4 lg:sticky lg:top-28">
      <EnrolCard course={course} content={content} />
      <HelpCard help={content.help} />
    </div>
  )
}
