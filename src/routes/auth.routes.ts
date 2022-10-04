import { Router } from 'express';
import { body } from '@verve-neowise/express-validius';

import { login, register, verify } from '@controllers/auth/index';
import { loginSchema, registerSchema } from '@schemas/index';

const router = Router()

router.post('/login', body(loginSchema), login)

router.post('/register', body(registerSchema),  register)

router.get('/verify', verify)

export default router