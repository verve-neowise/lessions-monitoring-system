import { getAssessmentsByLesson } from '@services/assessment.service';
import { getGroupStudents, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const groupId = +req.params.id
        const lessonId = +req.params.lesson

        const groupExists = await isGroupExists(organizationId, groupId)

        if (!groupExists) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        const assessments = await getAssessmentsByLesson(lessonId)
        const group = await getGroupStudents(organizationId, groupId)
        const students = group!.students

        const response = students.map(student => ({
            id: student.id,
            name: student.name,
            assessment: assessments.find(assessment => assessment.studentId == student.id) ?? null
        }))

        res.json({
            message: 'Lesson assessments',
            assessments: response
        })
    }
    catch(err) {
        next(err)
    }
}