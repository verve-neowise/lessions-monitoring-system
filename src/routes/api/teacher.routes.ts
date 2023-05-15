import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';

import { allTeachers, createTeacher, deleteTeacher, recoverTeacher, teacherDetails, teacherGroups, updateTeacher } from '@controllers/teachers/index';
import { createTeacherSchema, updateTeacherSchema } from '@schemas/teachers';
import { allTeacherDirection, addTeacherDirection, deleteTeacherDirection } from '@controllers/teachers/directions';
import getTeacher from '@controllers/teachers/get-teacher';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin'), allTeachers)

router.get('/:id', permissions('admin'), getTeacher)
router.post('/', permissions('admin'), body(createTeacherSchema), createTeacher)
router.put('/:id', permissions('admin'), body(updateTeacherSchema), updateTeacher)
router.delete('/:id', permissions('admin'), deleteTeacher)

router.get('/:id/details', permissions('admin', 'teacher'), teacherDetails)

router.get('/:id/groups', permissions('admin', 'teacher'), teacherGroups)

router.get('/:id/directions', permissions('admin', 'teacher'), allTeacherDirection)
router.post('/:id/directions', permissions('admin'), addTeacherDirection)
router.delete('/:id/directions/:dir_id', permissions('admin'), deleteTeacherDirection)

router.patch('/:id/recover', permissions('admin'), recoverTeacher)

export default router