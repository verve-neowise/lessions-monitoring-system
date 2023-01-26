import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { addLesson, deleteLesson, getLessons, updateLesson } from '@controllers/groups/lessons';
import { body } from '@verve-neowise/express-validius';
import { lessonSchema } from '@schemas/lesson';

const router = Router()

router.get('/', permissions('admin', 'teacher', 'student'), getLessons)
router.post('/', permissions('admin', 'teacher', 'student'), body(lessonSchema), addLesson)
router.put('/:lesson', permissions('admin', 'teacher', 'student'), body(lessonSchema), updateLesson)
router.delete('/:lesson', permissions('admin', 'teacher', 'student'), deleteLesson)

export default router