import { deleteTeacher, isTeacherExists } from '@services/teacher.service';
import { deleteUser } from '@services/user.service';
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

        const teacher = await deleteTeacher(id)
        const user = await deleteUser(teacher.userId)
        
        res.json({
            message: "Teacher deleted.",
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}