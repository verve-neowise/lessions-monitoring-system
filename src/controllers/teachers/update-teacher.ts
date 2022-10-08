import { TeacherDto } from '@models/index';
import { isTeacherExists, updateTeacher } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isTeacherExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const dto: TeacherDto = req.body

        const teacher = await updateTeacher(id, dto)

        res.json({
            message: "Teacher updated.",
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}