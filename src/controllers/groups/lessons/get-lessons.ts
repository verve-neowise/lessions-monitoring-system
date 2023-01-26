import { LessonResponse } from '@models/lesson.dto';
import { getLessons } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const lessons = await getLessons(+id)

        res.json({
            message: 'All lessons',
            lessons: lessons.map<LessonResponse>(lesson => (
                {
                    id: lesson.id,
                    date: lesson.date,
                    title: lesson.title
                }
            ))
        })
    }
    catch(err) {
        next(err)
    }
}