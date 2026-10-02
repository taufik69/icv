import { attachmentKeys, attachments, OTHER_ATTACHMENT } from '../data/enrolment/enrolmentOptions'
import { dataUrlToBlob } from './dataUrlToBlob'
import { toEnrolmentPayload } from './toEnrolmentPayload'

const ext = (blob) => (blob.type === 'image/jpeg' ? 'jpg' : 'png')

// The multipart body for POST /enrolments: "data" (answers as JSON), "signature", optional "agentStamp",
// and attachment_<key> files. `files` = the checklist files by document label (useAttachmentFiles);
// only documents that are ticked are sent.
export function buildEnrolmentFormData(values, files = {}) {
  const body = new FormData()
  body.append('data', JSON.stringify(toEnrolmentPayload(values)))
  if (values.signature) {
    const blob = dataUrlToBlob(values.signature)
    body.append('signature', blob, `signature.${ext(blob)}`)
  }
  if (values.agentStamp) {
    const blob = dataUrlToBlob(values.agentStamp)
    body.append('agentStamp', blob, `agent-stamp.${ext(blob)}`)
  }
  for (const label of values.attachments) {
    const key = label === OTHER_ATTACHMENT ? 'other' : attachmentKeys[attachments.indexOf(label)]
    for (const file of key ? files[label] ?? [] : []) body.append(`attachment_${key}`, file, file.name)
  }
  return body
}
