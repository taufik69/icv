import { CheckCircleIcon } from '@/shared/components/icons'
import { formatDate } from '../../lib/formatDate'
import { SectionCard } from './SectionCard'
import { SignedImage } from './SignedImage'

// (N) Student's declaration: ticked or not, signed date, the signature, and the agent's stamp if one was added.
export function DeclarationCard({ enrolmentId, declaration, stamp }) {
  return (
    <SectionCard id="declaration" letters="N" title="Declaration" aside={`Signed ${formatDate(declaration.signedDate)}`}>
      <p className="flex items-start gap-2.5 text-ink">
        <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-success" />
        {declaration.agreed ? 'The student declared the information is true and correct.' : 'The declaration was not ticked.'}
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SignedImage enrolmentId={enrolmentId} file={declaration.signature} label="Signature of student" />
        {stamp && <SignedImage enrolmentId={enrolmentId} file={stamp} label="Agent's stamp" />}
      </div>
    </SectionCard>
  )
}
