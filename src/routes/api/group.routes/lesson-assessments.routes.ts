import { Router } from 'express';
import { permissions } from '@middlewares/index';
import { createAssessment, getAssessments, setAssessment } from '@controllers/groups/lessons/assessments';
import { createAssessmentSchema, setAssessmentSchema } from '@schemas/assessments';
import { body } from '@verve-neowise/express-validius';

const router = Router({ mergeParams: true })

router.get('/assessments', permissions('admin', 'teacher'), getAssessments)
router.patch('/assessments/:assessmentId', permissions('admin', 'teacher'), body(setAssessmentSchema), setAssessment)
router.post('/assessments/', permissions('admin', 'teacher'), body(createAssessmentSchema), createAssessment)

export default router