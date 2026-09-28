import { courseFormBlocks } from '../data/courseFormBlocks'

// Page-outline state for a real course: a block is "filled" when the course data has it.
const keyFor = { basics: 'title' }

export function courseOutline(course) {
  return courseFormBlocks.map((block) => ({ ...block, filled: Boolean(course[keyFor[block.id] ?? block.id]) }))
}
