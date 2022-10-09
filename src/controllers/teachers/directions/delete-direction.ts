import { deleteTeacherDirection  } from '@services/teacher-directions.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const dirId = +req.params.dir_id

        const result = await deleteTeacherDirection(id, dirId)

        if (!result) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        res.json({
            message: `Teacher ${id} direction ${dirId} deleted.`,
        })
    }
    catch(err) {
        next(err)
    }
}