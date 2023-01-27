import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { addGroupStudent, getGroupStudents, removeGroupStudent } from '@controllers/groups/students';

const router = Router()

router.get('/', permissions('admin', 'teacher'),  getGroupStudents)
router.post('/', permissions('admin'),  addGroupStudent)
router.delete('/:sid', permissions('admin'), removeGroupStudent)

export default router