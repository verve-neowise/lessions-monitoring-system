import { LessonDto, LessonResponse } from '@models/lesson.dto';
import { Request, Response, NextFunction } from 'express';
import { createLesson } from '@services/lesson.service'
import { findGroupById } from '@services/group.service';
import { createAttachmentsFolder } from '@services/attachment.service';

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

        createAttachmentsFolder(organizationId, lesson.id)

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
            criteria: lesson.criteria,
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