import { TeacherResponse } from '@models/index';
import { deleteTeacher, isTeacherExists, recoverTeacher } from '@services/teacher.service';
import { deleteUser, recoverUser } from '@services/user.service';
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

        const teacher = await recoverTeacher(id)
        const user = await recoverUser(teacher.userId)
        
        const response: TeacherResponse = {
            id: teacher.id,
            userId: user.id,
            username: user.username,
            name: teacher.name,
            surname: teacher.surname,
            phone: teacher.phone,
            groups: [] ,
            directions: [],
            permissions: user.permissions,
        }

        res.json({
            message: "Teacher recovered.",
            teacher: response
        })
    }
    catch(err) {
        next(err)
    }
}