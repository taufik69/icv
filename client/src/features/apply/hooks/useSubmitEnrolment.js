import { useMutation } from '@tanstack/react-query'
import { enrolmentApi } from '../api/enrolmentApi'
import { buildEnrolmentFormData } from '../lib/buildEnrolmentFormData'
import { loadFiles } from '../lib/fileStore'
import { serverErrorsToFields } from '../lib/serverErrorsToFields'

// Sends the finished application: reads the checklist files kept with the draft, builds the multipart
// body and posts it. On a 400 the API's field errors come back already mapped to form fields + step
// (`error.fields`, `error.step`). Nothing to invalidate on this public form.
export function useSubmitEnrolment() {
  return useMutation({
    mutationFn: async (values) => {
      try {
        return await enrolmentApi.submit(buildEnrolmentFormData(values, await loadFiles()))
      } catch (err) {
        Object.assign(err, serverErrorsToFields(err.details))
        throw err
      }
    },
  })
}
