import { Router } from 'express';

import { allStudents, createStudent, deleteStudent, studentDetails, studentGroups, updateStudent } from '@controllers/students/index';
import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createStudentSchema } from '@schemas/students';

const router = Router()

router.use(permissions('students'))

router.get('/', allStudents)
router.post('/', body(createStudentSchema), createStudent)
router.put('/:id', body(createStudentSchema), updateStudent)
router.delete('/:id', deleteStudent)

router.get('/:id', studentDetails)
router.get('/:id/groups', studentGroups)

export default router