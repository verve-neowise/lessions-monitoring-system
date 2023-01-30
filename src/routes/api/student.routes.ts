import { Router } from 'express';

import { allStudents, createStudent, deleteStudent, studentDetails, studentGroups, updateStudent } from '@controllers/students/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createStudentSchema, updateStudentSchema } from '@schemas/students';

const router = Router()

router.get('/', permissions('admin'), allStudents)
router.post('/', permissions('admin'), body(createStudentSchema), createStudent)
router.put('/:id', permissions('admin'), body(updateStudentSchema), updateStudent)
router.delete('/:id', permissions('admin'), deleteStudent)

router.get('/:id', permissions('admin', 'teacher', 'student'), studentDetails)
router.get('/:id/groups', permissions('admin', 'teacher', 'student'), studentGroups)

export default router