import { LessonResponse } from '@models/lesson.dto';
import { deleteLesson } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, lesson: lessonId } = req.params

        const lesson = await deleteLesson(+lessonId)
        
        // TODO: delete material
        // TODO: delete attachment folder

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
            date: lesson.date,
        }

        res.json({
            message: 'lesson ' + id + ' deleted',
            lesson: response
        })
    }
    catch(err) {
        next(err)
    }
}