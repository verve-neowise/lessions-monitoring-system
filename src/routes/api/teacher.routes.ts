import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';

import { allTeachers, createTeacher, deleteTeacher, updateTeacher } from '@controllers/teachers/index';
import { createTeacherSchema, updateTeacherSchema } from '@schemas/teachers';

const router = Router()

router.use(permissions('teachers'))

router.get('/', allTeachers)
router.post('/', body(createTeacherSchema), createTeacher)
router.put('/:id', body(updateTeacherSchema), updateTeacher)
router.delete('/:id', deleteTeacher)

export default router