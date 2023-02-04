import { deleteUser } from '@services/user.service';
import { deleteStudent, isStudentExists } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';
import { StudentResponse } from '@models/index';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const find = await isStudentExists(organizationId, id)
        
        if (!find) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        const student = await deleteStudent(id)
        const user = await deleteUser(student.userId)

        const response: StudentResponse = {
            id: student.id,
            userId: user.id,
            username: user.username,
            name: student.name,
            surname: student.surname,
            birthday: student.birthday,
            phone: student.phone,
            groups: [],
            permissions: user.permissions,
        } 

        res.json({
            message: "Student deleted.",
            student
        })
    }
    catch(err) {
        next(err)
    }
}