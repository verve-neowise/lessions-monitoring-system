import { Router } from 'express';

import { allAdmins, createAdmin, deleteAdmin, updateAdmin } from '@controllers/admins/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { adminSchema } from '@schemas/admins';

const router = Router()

router.use(permissions('admins'))

router.get('/', allAdmins)
router.post('/', body(adminSchema), createAdmin)
router.put('/:id', body(adminSchema), updateAdmin)
router.delete('/:id', deleteAdmin)

export default router