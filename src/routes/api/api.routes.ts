import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'
import userRoutes from './users.routes'
import permissionRoutes from './permission.routes'
import directionRoutes from './direction.routes'
import groupRoutes from './group.routes'
import adminRoutes from './admin.routes'
import teacherRoutes from './teacher.routes'
import studentRoutes from './student.routes'
import dashboardRoutes from './dashboard.routes'
import criteriaRoutes from './criterias.routes'

const router = Router({ mergeParams: true })

router.use('/users', userRoutes)
router.use('/permissions', permissionRoutes)
router.use('/directions', directionRoutes)
router.use('/groups', groupRoutes)
router.use('/criterias', criteriaRoutes)
router.use('/admins', adminRoutes)
router.use('/teachers', teacherRoutes)
router.use('/students', studentRoutes)
router.use('/dashboard', dashboardRoutes)

router.use(errorHandler)

export default router