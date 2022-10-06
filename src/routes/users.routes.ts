import { Router } from 'express';
import { permissions } from '@middlewares/index'

import { allUsers, createUser, deleteUser, updatePermissions, updateUser } from '@controllers/users/index'
import { body } from '@verve-neowise/express-validius';
import { createUserSchema, updateUserSchema } from '@schemas/index';
import permissionsSchema from '@schemas/users/permissions.schema';

const router = Router()

router.use(permissions('users'))

router.get('/', allUsers)
router.post('/', body(createUserSchema), createUser)
router.put('/:id', body(updateUserSchema), updateUser)
router.put('/:id/permissions', body(permissionsSchema), updatePermissions)
router.delete('/:id', deleteUser)

export default router