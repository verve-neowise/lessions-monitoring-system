import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { addLesson, deleteLesson, getLessons, updateLesson } from '@controllers/groups/lessons';
import { body } from '@verve-neowise/express-validius';
import { lessonSchema } from '@schemas/lesson';

import material from './material.routes'

const router = Router({ mergeParams: true })

router.get('/', permissions('admin', 'teacher', 'student'), getLessons)
router.post('/', permissions('teacher'), body(lessonSchema), addLesson)
router.put('/:lesson', permissions('teacher'), body(lessonSchema), updateLesson)
router.delete('/:lesson', permissions('teacher'), deleteLesson)

router.use('/:id', material)

export default router