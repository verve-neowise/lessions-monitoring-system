import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createGroupSchema } from '@schemas/groups';

import { allGroups, createGroup, deleteGroup, groupDetails, updateGroup } from '@controllers/groups/index';
import { changeGroupTeacher, getGroupTeacher } from '@controllers/groups/teachers';
import { addGroupStudent, getGroupStudents, removeGroupStudent } from '@controllers/groups/students';

const router = Router()

router.get('/', permissions('admin'), allGroups)
router.post('/', permissions('admin'), body(createGroupSchema), createGroup)
router.put('/:id', permissions('admin'), body(createGroupSchema), updateGroup)
router.delete('/:id', permissions('admin'),  deleteGroup)

router.get('/:id', permissions('admin', 'teacher', 'student'), groupDetails)

router.get('/:id/teacher', permissions('admin', 'teacher'), getGroupTeacher)
router.put('/:id/teacher', permissions('admin'), changeGroupTeacher)

router.get('/:id/students', permissions('admin', 'teacher'),  getGroupStudents)
router.post('/:id/students', permissions('admin'),  addGroupStudent)
router.delete('/:id/students/:sid', permissions('admin'), removeGroupStudent)

export default router