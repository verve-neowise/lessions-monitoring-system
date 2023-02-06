import { AssessmentDto, CreateAssessmentDto, SetAssessmentDto } from '@models/assessment.dto';
import { createAssessment, isAssessmentExists, isStudentAssessmentExists, updateAssessment } from '@services/assessment.service';
import { isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const groupId = +req.params.id
        const lessonId = +req.params.lesson

        const assessmentDto: CreateAssessmentDto = req.body

        const groupExists = await isGroupExists(organizationId, groupId)

        if (!groupExists) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        const assessmentExists = await isStudentAssessmentExists(lessonId, assessmentDto.studentId)

        if (assessmentExists) {
            return res.status(404).json({
                message: 'Assessment already exists'
            })
        }

        const assessment = await createAssessment({
            groupId,
            lessonId,
            studentId: assessmentDto.studentId,
            comment: assessmentDto.comment,
            score: assessmentDto.score
        })

        res.status(200).json({
            message: 'Assessment set',
            assessment: {
                id: assessment.id,
                score: assessment.score,
                comment: assessment.comment
            }
        })
    }
    catch(err) {
        next(err)
    }
}