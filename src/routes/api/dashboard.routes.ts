import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { getStatistics } from '@controllers/dashboard';

const router = Router({ mergeParams: true })

router.use(permissions('admin'))

router.get('/', getStatistics)

export default router