import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { changeGroupTeacher, getGroupTeacher } from '@controllers/groups/teachers';

const router = Router()

router.get('/', permissions('admin', 'teacher', 'student'), getGroupTeacher)
router.put('/', permissions('admin'), changeGroupTeacher)

export default router