import { Router } from 'express';

import { allStudents, createStudent, deleteStudent, updateStudent } from '@controllers/students/index';
import { permissions } from '@middlewares/index';

const router = Router()

router.use(permissions('students'))

router.get('/', allStudents)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router