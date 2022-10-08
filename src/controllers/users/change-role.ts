import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

import { createStudent, findStudentByUserId } from '@services/student.service';
import { createTeacher, findTeacherByUserId } from '@services/teacher.service';
import { changeUserRole } from '@services/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const { role } = req.body

        const update = await changeUserRole(id, role)

        if (role == Role.student) {
           await createStudentAccountIfNotExists(id)
        }
        else if (role == Role.teacher) {
            await createTeacherAccountIfNotExists(id)
        }

        res.json({
            message: `user ${update.username} role changed.`,
            role
        })
    }
    catch(err) {
        next(err)
    }
}

const createTeacherAccountIfNotExists = async (id: number) => {
    
    const student = await findStudentByUserId(id)

    if (!student) {
        await createStudent({
            userId: id,
            name: "",
            surname: "",
            birthday: "",
            phone: ""
        })
    }
}

const createStudentAccountIfNotExists = async (id: number) => {
    const teacher = await findTeacherByUserId(id)
    if (!teacher) {
        await createTeacher({
            userId: id,
            name: "",
            surname: "",
            birthday: "",
            phone: ""
        })
    }
}