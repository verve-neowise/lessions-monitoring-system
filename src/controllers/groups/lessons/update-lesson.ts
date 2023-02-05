import { LessonDto, LessonResponse } from '@models/lesson.dto';
import { isGroupExists } from '@services/group.service';
import { updateLesson } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonId: number = +req.params.lesson

        const { orgId, id } = req.params

        const find = await isGroupExists(+orgId, +id)

        if (!find) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }
        const lessonDto: LessonDto = req.body

        const lesson = await updateLesson(lessonId, lessonDto)

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
            date: lesson.date,
            criteria: lesson.criteria
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