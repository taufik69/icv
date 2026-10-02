import { Router } from 'express'
import { applicationRouter } from '../modules/application/application.routes.js'
import { requireAuth } from '../modules/auth/auth.middleware.js'
import { authRouter } from '../modules/auth/auth.routes.js'
import { enrolmentRouter } from '../modules/enrolment/enrolment.routes.js'
import { courseAdminRouter, courseRouter } from '../modules/course/course.routes.js'
import { healthRouter } from '../modules/health/health.routes.js'
import { statsRouter } from '../modules/stats/stats.routes.js'
import { taxonomyRouter } from '../modules/taxonomy/taxonomy.routes.js'
import { uploadRouter } from '../modules/upload/upload.routes.js'

// Mount each module's router here. Everything under /admin needs a signed-in staff session; the
// applications and enrolments routers guard all but their public submit themselves.
export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/courses', courseRouter)
apiRouter.use('/admin', requireAuth)
apiRouter.use('/admin/courses', courseAdminRouter)
apiRouter.use('/admin/uploads', uploadRouter)
apiRouter.use('/admin/taxonomies', taxonomyRouter)
apiRouter.use('/admin/stats', statsRouter)
apiRouter.use('/applications', applicationRouter)
apiRouter.use('/enrolments', enrolmentRouter)
