import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { changeGroupTeacher, getGroupTeacher } from '@controllers/groups/teachers';

const router = Router({ mergeParams: true })

router.use((req, res, next) => {
    console.log('required permissions: group teachers');
    console.log(res.locals.payload)
    next()
})

router.get('/', permissions('admin', 'teacher', 'student'), getGroupTeacher)
router.put('/', permissions('admin'), changeGroupTeacher)

export default router