import { LessonResponse } from '@models/lesson.dto';
import { isGroupExists } from '@services/group.service';
import { deleteLesson } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, orgId, lesson: lessonId } = req.params

        const find = await isGroupExists(+orgId, +id)

        if (!find) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const lesson = await deleteLesson(+lessonId)
        
        // TODO: delete attachment folder

        const response: LessonResponse = {
            id: lesson.id,
            title: lesson.title,
            date: lesson.date,
            type: lesson.type,
            criteria: lesson.criteria
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