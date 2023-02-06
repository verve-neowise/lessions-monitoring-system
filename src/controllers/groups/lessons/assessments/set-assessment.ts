import { AssessmentDto, SetAssessmentDto } from '@models/assessment.dto';
import { isAssessmentExists, updateAssessment } from '@services/assessment.service';
import { isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const groupId = +req.params.id
        const assessmentId = +req.params.assessmentId

        const assessmentDto: SetAssessmentDto = req.body

        const groupExists = await isGroupExists(organizationId, groupId)

        if (!groupExists) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        const assessmentExists = await isAssessmentExists(assessmentId)

        if (!assessmentExists) {
            return res.status(404).json({
                message: 'Assessment not found'
            })
        }

        const assessment = await updateAssessment(assessmentId, assessmentDto)

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