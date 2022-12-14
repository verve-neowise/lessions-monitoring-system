import { Router } from 'express';

import { allPermissions } from '@controllers/permissions/index';
import { permissions } from '@middlewares/index';

const router = Router()

router.use(permissions('profile'))

router.get('/', allPermissions)

export default router