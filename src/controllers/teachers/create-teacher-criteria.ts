import { CriteriaDto } from '@models/criteria.dto';
import { createCriteria } from '@services/criteria.service';
import { findTeacherById, findTeacherByUserId } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId

        const criteriaDto: CriteriaDto = req.body

        const maxScorings = criteriaDto.scorings.reduce((acc, scoring) => acc + scoring.value, 0)

        if (criteriaDto.maximum != maxScorings) {
            return res.status(400).json({
                message: 'Scorings and max value dont matching'
            })
        }

        let teacherId = -1

        if (criteriaDto.teacher) {
            teacherId = criteriaDto.teacher

            const teacher = await findTeacherById(organizationId, teacherId)

            if (!teacher) {
                return res.status(404).json({
                    message: 'Teacher not found'
                })
            }
        }
        else {
            const teacher = await findTeacherByUserId(organizationId, res.locals.payload.userId)
            if (!teacher) {
                return res.status(404).json({
                    message: 'Teacher id not provided or access not permitted'
                })
            }

            teacherId = teacher.id
        }

        const criteria = await createCriteria(organizationId, teacherId, criteriaDto)

        res.json({
            message: 'Criteria created',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}