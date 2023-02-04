import { LessonDto, LessonResponse } from '@models/lesson.dto';
import { Request, Response, NextFunction } from 'express';
import { createLesson } from '@services/lesson.service'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId: number = +req.params.id

        const lessonDto: LessonDto = req.body

        const lesson = await createLesson(groupId, lessonDto)

        // TODO: create material for lesson
        // TODO: create attachment folder
        // TODO: create assessments for this lesson

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
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