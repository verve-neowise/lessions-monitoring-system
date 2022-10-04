import { Router } from 'express'
import errorHandler from '../../middlewares/error-handler'
import authRoutes from './auth.routes'

const router = Router()

router.use('/auth', authRoutes)

router.use(errorHandler)

export default router