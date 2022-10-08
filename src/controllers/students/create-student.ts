import { TeacherDto } from '@models/teacher.dto';
import { createTeacher, findTeacherByUserId } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId } = req.body

        const dto: TeacherDto = req.body

        const model = await findTeacherByUserId(+userId)

        if (model) {
            return res.status(403).json({
                message: "Teacher profile already exists for user: " + userId
            })
        }

        const teacher = await createTeacher(dto)

        res.json({
            message: "teacher created.",
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}