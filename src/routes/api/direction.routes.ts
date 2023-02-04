import { Router } from 'express';

import { allDirections, createDirection, deleteDirection, updateDirection } from '@controllers/directions/index';
import { directionSchema } from '@schemas/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';

const router = Router({ mergeParams: true })

router.use(permissions('admin'))

router.get('/', allDirections)
router.post('/', body(directionSchema), createDirection)
router.put('/:id', body(directionSchema), updateDirection)
router.delete('/:id', deleteDirection)

export default router