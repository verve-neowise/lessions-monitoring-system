import { Router } from 'express';
import { permissions } from '@middlewares/index'

import { allUsers, createUser, deleteUser, updatePermissions, updateUser } from '@controllers/users/index'
import { body } from '@verve-neowise/express-validius';
import { createUserSchema, permissionsSchema, updateUserSchema } from '@schemas/index';

const router = Router({ mergeParams: true })

router.use(permissions('admin'))

router.get('/', allUsers)
router.post('/', body(createUserSchema), createUser)
router.put('/:id', body(updateUserSchema), updateUser)
router.put('/:id/permissions', body(permissionsSchema), updatePermissions)
router.delete('/:id', deleteUser)

export default router