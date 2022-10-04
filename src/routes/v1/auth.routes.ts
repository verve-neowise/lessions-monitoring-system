import { Router } from 'express';
import { body } from '@verve-neowise/express-validius';

import { login, register, verify } from '../../controllers/auth';
import { loginSchema, registerSchema } from '../../schemas';

const router = Router()

router.post('/login', body(loginSchema), login)

router.post('/register', body(registerSchema),  register)

router.get('/verify', verify)

export default router