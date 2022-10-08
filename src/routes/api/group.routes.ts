import { Router } from 'express';

import { allGroups, createGroup, deleteGroup, updateGroup } from '@controllers/groups/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createGroupSchema } from '@schemas/groups';

const router = Router()

router.use(permissions('groups'))

router.get('/',  allGroups)
router.post('/', body(createGroupSchema), createGroup)
router.put('/:id', body(createGroupSchema), updateGroup)
router.delete('/:id', deleteGroup)

export default router