import { Assessment } from '@prisma/client';
import { getAssessmentsByGroupStudent } from '@services/assessment.service';
import { isGroupExists } from '@services/group.service';
import { getLessons } from '@services/lesson.service';
import { isStudentExists } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const groupId = +req.params.id
        const studentId = +req.params.sid

        const groupExists = await isGroupExists(organizationId, groupId)

        if (!groupExists) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        const studentExists = await isStudentExists(organizationId, studentId)

        if (!studentExists) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }

        const lessons = await getLessons(groupId)

        const assessments = await getAssessmentsByGroupStudent(groupId, studentId)

        const map = (assessment: Assessment | null) => assessment ? {
            id: assessment.id,
            comment: assessment.comment,
            score: assessment.score
        } : null

        res.status(200).json({
            message: 'Student assessments',
            lessons: lessons.map(lesson => ({
                id: lesson.id,
                title: lesson.title,
                assessment: map(assessments.find(assessment => assessment.lessonId == lesson.id) ?? null)
            }))
        })
    }
    catch(err) {
        next(err)
    }
}

