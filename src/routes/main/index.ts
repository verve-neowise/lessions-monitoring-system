import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import { requestLogger } from '@middlewares/index'

import mainRoutes from './main.routes'

const router = Router({ mergeParams: true })

router.use('/', mainRoutes)

router.use(errorHandler)

export default router