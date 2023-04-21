import { Router } from 'express';

import { allStudents, createStudent, deleteStudent, getStudent, recoverStudent, studentDetails, studentGroups, updateStudent } from '@controllers/students/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createStudentSchema, updateStudentSchema } from '@schemas/students';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin'), allStudents)
router.get('/:id', permissions('admin'), getStudent)
router.post('/', permissions('admin'), body(createStudentSchema), createStudent)
router.put('/:id', permissions('admin'), body(updateStudentSchema), updateStudent)
router.delete('/:id', permissions('admin'), deleteStudent)

router.get('/:id/details', permissions('admin', 'teacher', 'student'), studentDetails)
router.get('/:id/groups', permissions('admin', 'teacher', 'student'), studentGroups)

router.patch('/:id/recover', permissions('admin'), recoverStudent)

export default router