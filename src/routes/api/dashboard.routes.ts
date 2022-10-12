import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { getStatistics } from '@controllers/dashboard';

const router = Router()

router.use(permissions('dashboard'))

router.get('/', getStatistics)

export default router