import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';

import { allTeachers, createTeacher, deleteTeacher, teacherDetails, teacherGroups, updateTeacher } from '@controllers/teachers/index';
import { createTeacherSchema } from '@schemas/teachers';
import { allTeacherDirection, addTeacherDirection, deleteTeacherDirection } from '@controllers/teachers/directions';

const router = Router()

router.use(permissions('teachers'))

router.get('/', allTeachers)
router.post('/', body(createTeacherSchema), createTeacher)
router.put('/:id', body(createTeacherSchema), updateTeacher)
router.delete('/:id', deleteTeacher)

router.get('/:id', teacherDetails)

router.get('/:id/groups', teacherGroups)

router.get('/:id/directions', allTeacherDirection)
router.post('/:id/directions', addTeacherDirection)
router.delete('/:id/directions/:dir_id', deleteTeacherDirection)

export default router