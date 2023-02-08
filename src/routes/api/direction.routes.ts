import { Router } from 'express';

import { allDirections, createDirection, deleteDirection, directionDetails, getDirection, recoverDirection, updateDirection } from '@controllers/directions/index';
import { directionSchema } from '@schemas/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';

const router = Router({ mergeParams: true })

router.use(permissions('admin'))

router.get('/', allDirections)
router.get('/:id', getDirection)
router.get('/:id/details', directionDetails)
router.post('/', body(directionSchema), createDirection)
router.put('/:id', body(directionSchema), updateDirection)
router.delete('/:id', deleteDirection)

router.patch('/:id/recover', permissions('admin'), recoverDirection)

export default router