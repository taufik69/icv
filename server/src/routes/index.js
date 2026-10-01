import { Router } from 'express'
import { applicationRouter } from '../modules/application/application.routes.js'
import { courseAdminRouter, courseRouter } from '../modules/course/course.routes.js'
import { healthRouter } from '../modules/health/health.routes.js'
import { uploadRouter } from '../modules/upload/upload.routes.js'

// Mount each module's router here.
export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/courses', courseRouter)
apiRouter.use('/admin/courses', courseAdminRouter)
apiRouter.use('/admin/uploads', uploadRouter)
apiRouter.use('/applications', applicationRouter)
