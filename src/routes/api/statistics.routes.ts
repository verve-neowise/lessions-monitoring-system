import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { getStatistics } from '@controllers/statistics';

const router = Router()

router.use(permissions('statistics'))

router.get('/', getStatistics)

export default router