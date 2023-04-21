import { Assessment } from '@prisma/client';
import { getAssessmentsByGroup, getAssessmentsByLesson } from '@services/assessment.service';
import { getGroupStudents, isGroupExists } from '@services/group.service';
import { getLessons } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const groupId = +req.params.id

        const groupExists = await isGroupExists(organizationId, groupId)

        if (!groupExists) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        const assessments: Assessment[] = await getAssessmentsByGroup(groupId)
        const lessons = await getLessons(groupId)

        const group = await getGroupStudents(organizationId, groupId)

        const students = group!.students

        const lessonAssessments = lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            date: lesson.date,
            type: lesson.type,
            lessons: students.map(student => ({
                studentId: student.id,
                name: student.name,
                assessment: assessments.find(assessment =>
                    assessment.lessonId == lesson.id && assessment.studentId == student.id
                ) ?? null
            }))
        }))

        res.json({
            message: 'Group assessments',
            assessments: lessonAssessments
        })
    }
    catch(err) {
        next(err)
    }
}