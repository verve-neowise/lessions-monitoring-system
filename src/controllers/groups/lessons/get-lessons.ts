import { LessonResponse } from '@models/lesson.dto';
import { isGroupExists } from '@services/group.service';
import { getLessons } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, orgId } = req.params

        const find = await isGroupExists(+orgId, +id)

        if (!find) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

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