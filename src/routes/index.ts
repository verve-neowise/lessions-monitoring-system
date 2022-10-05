import { Router } from 'express'
import errorHandler from '@middlewares/error-handler'
import authRoutes from './auth.routes'
import testRoutes from './test.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/test', testRoutes)

router.use(errorHandler)

export default router