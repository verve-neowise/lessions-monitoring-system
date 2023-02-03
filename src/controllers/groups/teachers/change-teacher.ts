import { isTeacherExists } from '@services/teacher.service';
import { changeGroupTeacher, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const { id } = req.params

        const { teacherId } = req.body

        const groupExists = await isGroupExists(organizationId, +id)

        if (!groupExists) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        console.log("TeacherId: " + teacherId);
        

        const teacherExists = await isTeacherExists(organizationId, +teacherId)

        if (!teacherExists) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const group = await changeGroupTeacher(+id, +teacherId)

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