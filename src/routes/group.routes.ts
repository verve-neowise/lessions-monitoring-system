import { Router } from 'express';

import { allGroups, createGroup, deleteGroup, updateGroup } from '@controllers/groups/index';
import { permissions } from '@middlewares/index';

const router = Router()

router.use(permissions('groups'))

router.get('/', allGroups)
router.post('/', createGroup)
router.put('/:id', updateGroup)
router.delete('/:id', deleteGroup)

export default router