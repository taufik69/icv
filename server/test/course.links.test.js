import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Course } from '../src/modules/course/course.model.js'
import { courseValidation } from '../src/modules/course/course.validation.js'

// Course links end up as <a href> on the public site, so they must be real http(s) web addresses.
const body = (over) => ({ market: 'domestic', slug: 'test-course', code: 'TST101', title: 'Test course', level: 'cert-iii', studyArea: 'building', ...over })
const problem = (over) => {
  const result = courseValidation.create.body.safeParse(body(over))
  return result.success ? null : result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
}

describe('course links', () => {
  it('accepts an empty or a proper external page', () => {
    assert.equal(problem({ externalUrl: '' }), null)
    assert.equal(problem({ externalUrl: 'https://icv.edu.au/courses/disability/' }), null)
  })

  it('names the field when the external page is not a web address', () => {
    assert.deepEqual(problem({ externalUrl: 'Dolor lorem natus do' }), ['externalUrl: External page: enter a full web address starting with http:// or https://'])
  })

  it('refuses script and data links on the external page', () => {
    for (const bad of ['javascript:alert(1)', 'data:text/html,hi', 'mailto:a@b.co']) assert.notEqual(problem({ externalUrl: bad }), null, bad)
  })

  it('refuses a script link as the course guide (checked by the model on save)', () => {
    const bad = new Course({ ...body(), detail: { guideUrl: 'javascript:alert(1)' } }).validateSync()
    assert.match(bad.errors['detail.guideUrl'].message, /Course guide link: enter a full web address/)
    const good = new Course({ ...body(), detail: { guideUrl: 'https://icv.edu.au/guide.pdf' } }).validateSync()
    assert.equal(good?.errors?.['detail.guideUrl'], undefined)
  })
})
