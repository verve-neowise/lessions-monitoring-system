import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import { requestLogger } from '@middlewares/index'
import authRoutes from './auth.routes'
import userRoutes from './users.routes'
import permissionRoutes from './permission.routes'
import directionRoutes from './direction.routes'
import groupRoutes from './group.routes'
import teacherRoutes from './teacher.routes'
import studentRoutes from './student.routes'

const router = Router()

router.use(requestLogger)

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/permissions', permissionRoutes)
router.use('/directions', directionRoutes)
router.use('/groups', groupRoutes)
router.use('/teachers', teacherRoutes)
router.use('/students', studentRoutes)

router.use(errorHandler)

export default router