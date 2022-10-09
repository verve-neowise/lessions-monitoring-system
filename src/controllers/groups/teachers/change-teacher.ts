import { isTeacherExists } from '@services/teacher.service';
import { changeGroupTeacher, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, tid } = req.params

        const groupExists = await isGroupExists(+id)

        if (!groupExists) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const teacherExists = await isTeacherExists(+tid)

        if (!teacherExists) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const group = await changeGroupTeacher(+id, +tid)

        res.json({
            message: "Group teacher changed",
            name: group.name,
            teacher: group.teacher
        })
    }
    catch(err) {
        next(err)
    }
}