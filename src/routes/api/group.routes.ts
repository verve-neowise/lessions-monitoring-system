import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createGroupSchema } from '@schemas/groups';

import { allGroups, createGroup, deleteGroup, groupDetails, updateGroup } from '@controllers/groups/index';
import { changeGroupTeacher, getGroupTeacher } from '@controllers/groups/teachers';
import { addGroupStudent, getGroupStudents, removeGroupStudent } from '@controllers/groups/students';

const router = Router()

router.use(permissions('groups'))

router.get('/',  allGroups)
router.post('/', body(createGroupSchema), createGroup)
router.put('/:id', body(createGroupSchema), updateGroup)
router.delete('/:id', deleteGroup)

router.get('/:id', groupDetails)

router.get('/:id/teacher', getGroupTeacher)
router.put('/:id/teacher', changeGroupTeacher)

router.get('/:id/students', getGroupStudents)
router.post('/:id/students', addGroupStudent)
router.delete('/:id/students/:sid', removeGroupStudent)

export default router