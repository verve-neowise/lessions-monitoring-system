import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { addGroupStudent, getGroupStudentAssessment, getGroupStudents, removeGroupStudent } from '@controllers/groups/students';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin', 'teacher'),  getGroupStudents)
router.post('/', permissions('admin'),  addGroupStudent)

router.get('/:sid/assessment', permissions('admin'), getGroupStudentAssessment )
router.delete('/:sid', permissions('admin'), removeGroupStudent)

export default router