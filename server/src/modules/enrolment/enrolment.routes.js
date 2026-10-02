import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { requireAuth } from '../auth/auth.middleware.js'
import { enrolmentController as c } from './enrolment.controller.js'
import { parseData, receiveFiles } from './enrolment.files.js'
import { enrolmentValidation as v, validateEnrolmentBody } from './enrolment.validation.js'

// POST is public (the website's enrolment form, multipart: "data" JSON + files); every other route,
// including the file downloads (passports…), needs a staff session (requireAuth). TODO:
// add rate limiting / spam protection to POST before going live.
export const enrolmentRouter = Router()

enrolmentRouter.post('/', receiveFiles, parseData, validateEnrolmentBody, c.create)
enrolmentRouter.use(requireAuth) // every route below is for signed-in staff
enrolmentRouter.get('/', validate(v.list), c.list)
enrolmentRouter.get('/counts', c.counts)
enrolmentRouter.get('/:id', validate(v.byId), c.getById)
enrolmentRouter.get('/:id/files/:fileId', validate(v.file), c.file)
enrolmentRouter.patch('/:id', validate({ ...v.byId, ...v.update }), c.update)
enrolmentRouter.delete('/:id', validate(v.byId), c.remove)
