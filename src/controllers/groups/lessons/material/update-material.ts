import { MaterialResponse } from '@models/lesson.dto';
import { updateLessonMaterial } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonId = +req.params.lesson
        const { content } = req.body

        const lesson = await updateLessonMaterial(lessonId, content)

        const material: MaterialResponse = {
            content: lesson.material.content
        }

        res.json({
            message: "Material updated",
            material
        })
    }
    catch(err) {
        next(err)
    }
}