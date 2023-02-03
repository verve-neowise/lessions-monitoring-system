import { TeacherResponse } from '@models/index';
import { deleteTeacher, isTeacherExists } from '@services/teacher.service';
import { deleteUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const find = await isTeacherExists(organizationId, id)
        
        if (!find) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const teacher = await deleteTeacher(id)
        const user = await deleteUser(teacher.userId)
        
        const response: TeacherResponse = {
            id: teacher.id,
            userId: user.id,
            username: user.username,
            name: teacher.name,
            surname: teacher.surname,
            phone: teacher.phone,
            groups: teacher.groups,
            directions: teacher.directions,
            permissions: user.permissions,
        }

        res.json({
            message: "Teacher deleted.",
            teacher: response
        })
    }
    catch(err) {
        next(err)
    }
}