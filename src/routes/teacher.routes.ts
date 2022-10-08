import { Router } from 'express';

import { allTeachers, createTeacher, deleteTeacher, updateTeacher } from '@controllers/teachers/index';
import { permissions } from '@middlewares/index';

const router = Router()

router.use(permissions('teachers'))

router.get('/', allTeachers)
router.post('/', createTeacher)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

export default router