import { addTeacherDirection } from '@services/teacher-directions.service';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const { directionId } = req.body

        const result = await addTeacherDirection(id, +directionId)

        if (!result) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        res.json({
            message: `Add direction ${directionId} from teacher ${id}`,
        })
    }
    catch(err) {
        next(err)
    }
}