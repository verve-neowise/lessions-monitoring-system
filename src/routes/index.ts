import { Router } from 'express'
import errorHandler from '@middlewares/error-handler'
import authRoutes from './auth.routes'
import usersRoutes from './users.routes'
import directionsRoutes from './direction.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/directions', directionsRoutes)

router.use(errorHandler)

export default router