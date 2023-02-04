import { LessonDto, LessonResponse } from '@models/lesson.dto';
import { updateLesson } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonId: number = +req.params.lesson

        const lessonDto: LessonDto = req.body

        const lesson = await updateLesson(lessonId, lessonDto)

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