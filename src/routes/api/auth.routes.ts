import { Router } from 'express'
import { body } from '@verve-neowise/express-validius'

import { login, register, verify } from '@controllers/auth/index'
import { loginSchema, registerSchema } from '@schemas/index'
import { permissions } from '@middlewares/index'

const router = Router({ mergeParams: true })

router.post('/login', body(loginSchema), login)

router.post('/register', body(registerSchema), register)

router.get('/verify', permissions(), verify)

export default router
