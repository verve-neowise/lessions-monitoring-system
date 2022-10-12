import { getTeacherDirections } from '@services/teacher-directions.service';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const result = await getTeacherDirections(id)

        if (!result) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        res.json({
            message: `Teacher ${id} directions`,
            directions: result.directions
        })
    }
    catch(err) {
        next(err)
    }
}