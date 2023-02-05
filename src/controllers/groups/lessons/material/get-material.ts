import { getLessonMaterial } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonId = +req.params.lesson
        const lesson = await getLessonMaterial(lessonId)

        if (!lesson) {
            return res.status(404).json({
                message: 'Lesson material not found'
            })
        }

        res.json({
            message: 'Lesson material',
            material: {
                content: lesson.material.content
            }
        })
    }
    catch(err) {
        next(err)
    }
}