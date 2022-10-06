import { Router } from 'express';
import { permissions } from '@middlewares/index'

import { allUsers, createUser, deleteUser, updatePermissions, updateUser } from '@controllers/users/index'

const router = Router()

router.use(permissions('users'))

router.get('/', allUsers)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/:id/permissions', updatePermissions)
router.delete('/:id', deleteUser)

export default router