import { Router } from 'express';

import { adminDetails, allAdmins, createAdmin, deleteAdmin, getAdmin, recoverAdmin, updateAdmin } from '@controllers/admins/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { adminSchema, adminUpdateSchema } from '@schemas/admins';

const router = Router({ mergeParams: true })

router.use(permissions('admin'))

router.get('/', allAdmins)
router.get('/:id', getAdmin)
router.get('/:id/details', adminDetails)
router.post('/', body(adminSchema), createAdmin)
router.put('/:id', body(adminUpdateSchema), updateAdmin)
router.delete('/:id', deleteAdmin)

router.patch('/:id/recover', recoverAdmin)

export default router