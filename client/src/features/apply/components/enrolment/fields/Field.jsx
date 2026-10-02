import { ApplyField } from '../../ApplyField'
import { inputClass } from './fieldStyles'

// ApplyField in the enrolment form's input look.
export function Field(props) {
  return <ApplyField controlClass={`mt-1.5 ${inputClass}`} {...props} />
}
