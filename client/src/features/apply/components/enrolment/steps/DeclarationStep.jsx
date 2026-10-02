import { attachments, declarationText } from '../../../data/enrolment/enrolmentOptions'
import { ApplyField } from '../../ApplyField'
import { FormGroup } from '../../FormGroup'
import { EnrolmentProcedure } from '../EnrolmentProcedure'
import { CheckList } from '../fields/CheckList'
import { DocumentPicker } from '../fields/DocumentPicker'

// (L) Enrolment Procedure, (M) Attachment Checklist and (N) Student's Declaration.
export function DeclarationStep({ form }) {
  const { values, errors, field, set, toggle } = form
  return (
    <>
      <FormGroup title="Enrolment procedure">
        <EnrolmentProcedure />
      </FormGroup>

      <FormGroup title="Attachment checklist">
        <CheckList
          name="attachments" options={attachments} values={values.attachments} onToggle={(o) => toggle('attachments', o)}
          label="Provide all the relevant documents, incomplete applications will cause delays in processing:" className="sm:col-span-2"
        />
        <ApplyField {...field('attachmentOther')} label="Other" placeholder="Any other document you are attaching" className="sm:col-span-2" />
        <DocumentPicker />
      </FormGroup>

      <FormGroup title="Student's declaration">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-surface-muted p-4 ring-1 ring-line has-checked:ring-secondary has-focus-visible:shadow-focus-success sm:col-span-2">
          <input
            type="checkbox" name="declaration" checked={values.declaration} onChange={set('declaration')}
            aria-invalid={errors.declaration ? true : undefined} aria-describedby={errors.declaration ? 'apply-declaration-error' : undefined}
            className="mt-1 size-4.5 shrink-0 accent-secondary"
          />
          <span className="font-heading text-lg leading-snug font-semibold text-secondary">{declarationText}</span>
        </label>
        {errors.declaration && <p id="apply-declaration-error" className="-mt-2 text-sm text-danger-ink sm:col-span-2">{errors.declaration}</p>}
        <ApplyField {...field('signature')} label="Signature of student (type your full name)" placeholder="e.g. Priya Sharma" required autoComplete="name" />
        <ApplyField {...field('signedDate')} label="Date" required type="date" />
      </FormGroup>
    </>
  )
}
