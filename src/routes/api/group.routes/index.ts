import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { body } from '@verve-neowise/express-validius';
import { createGroupSchema } from '@schemas/groups';

import { allGroups, createGroup, deleteGroup, groupDetails, updateGroup, groupAssessments, recoverGroup } from '@controllers/groups/index';

import teachers from './teacher.routes';
import students from './student.routes';
import lessons from './lesson.routes';
import getGroup from '@controllers/groups/get-group';

const router = Router({ mergeParams: true })

router.get('/', permissions('admin'), allGroups)
router.get('/:id', permissions('admin', 'teacher'), getGroup)
router.post('/', permissions('admin'), body(createGroupSchema), createGroup)
router.put('/:id', permissions('admin'), body(createGroupSchema), updateGroup)
router.delete('/:id', permissions('admin'),  deleteGroup)

router.get('/:id/details', permissions('admin', 'teacher'), groupDetails)

router.patch('/:id/recover', permissions('admin'), recoverGroup)

router.use('/:id/teacher', teachers)
router.use('/:id/students', students)
router.use('/:id/lessons', lessons)

router.get('/:id/assessments', permissions('admin', 'teacher'), groupAssessments)

export default router