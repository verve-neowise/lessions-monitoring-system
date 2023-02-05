import { Router } from 'express';

import { allCriterias, createCriteria, deleteCriteria, updateCriteria } from '@controllers/criterias';
import { permissions } from '@middlewares/index';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin', 'teacher', 'student'), allCriterias)
router.post('/', permissions('admin', 'teacher'), createCriteria)
router.put('/:id', permissions('admin', 'teacher'), updateCriteria)
router.delete('/:id', permissions('admin', 'teacher'), deleteCriteria)

export default router