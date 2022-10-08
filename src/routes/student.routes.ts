import { Router } from 'express';

import { allStudents, createStudent, deleteStudent, updateStudent } from '@controllers/students/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createStudentSchema, updateStudentSchema } from '@schemas/students';

const router = Router()

router.use(permissions('students'))

router.get('/', allStudents)
router.post('/', body(createStudentSchema), createStudent)
router.put('/:id', body(updateStudentSchema), updateStudent)
router.delete('/:id', deleteStudent)

export default router