import { LessonDto, LessonResponse } from '@models/lesson.dto';
import { Request, Response, NextFunction } from 'express';
import { createLesson } from '@services/lesson.service'
import { findGroupById, getGroupStudents } from '@services/group.service';
import { createAttachmentsFolder } from '@services/attachment.service';
import { createAssessments } from '@services/assessment.service';
import { Lesson, Student } from '@prisma/client';
import { AssessmentDto } from '@models/assessment.dto';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = +req.params.id
        const organizationId = +req.params.id

        const group = await findGroupById(organizationId, groupId)

        if (!group) {
            return res.status(403).json({
                message: "Group not found: " + groupId
            })
        }

        const lessonDto: LessonDto = req.body

        const lesson = await createLesson(groupId, lessonDto)

        const groupStudents = await getGroupStudents(organizationId, groupId)
        
        if (groupStudents) {
            const dtos = buildAssessments(groupId, lesson.id, groupStudents.students)
            const assessments = await createAssessments(dtos)
            console.log("Assessments:", assessments.count);
        }

        createAttachmentsFolder(organizationId, lesson.id)

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
            criteria: lesson.criteria,
            type: lesson.type,
            date: lesson.date
        }

        res.json({
            message: "Lesson created",
            lesson: response
        })
    }
    catch(err) {
        next(err)
    }
}

const buildAssessments = (groupId: number, lessonId: number, students: Student[]): AssessmentDto[] => {
    return students.map(student => ({
        groupId,
        lessonId,
        studentId: student.id,
        comment: '',
        score: -1
    }))
}