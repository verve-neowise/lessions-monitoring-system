import { Router } from 'express';

import { allCriterias, createCriteria, deleteCriteria, recoverCriteria, updateCriteria } from '@controllers/criterias';
import { permissions } from '@middlewares/index';
import getCriteria from '@controllers/criterias/get-criteria';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin', 'teacher', 'student'), allCriterias)
router.get('/:id', permissions('admin', 'teacher', 'student'), getCriteria)
router.post('/', permissions('admin', 'teacher'), createCriteria)
router.put('/:id', permissions('admin', 'teacher'), updateCriteria)
router.delete('/:id', permissions('admin', 'teacher'), deleteCriteria)

router.patch('/:id/recover', permissions('admin'), recoverCriteria)

export default router