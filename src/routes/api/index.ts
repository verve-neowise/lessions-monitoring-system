import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'
import organizationRoutes from './organization.routes'
import apiRoutes from './api.routes'

const router = Router({ mergeParams: true })

router.use('/auth', authRoutes)
router.use('/organizations', organizationRoutes)
router.use('/organizations/:orgId/', apiRoutes)

router.use(errorHandler)

export default router