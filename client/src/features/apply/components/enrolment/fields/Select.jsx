import { ApplySelect } from '../../ApplySelect'
import { selectClass } from './fieldStyles'

// ApplySelect in the enrolment form's input look.
export function Select(props) {
  return <ApplySelect triggerClass={selectClass} {...props} />
}
