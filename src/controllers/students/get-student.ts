import { StudentResponse } from '@models/student.dto';
import { findStudentById, findStudentWithDetails } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const student = await findStudentWithDetails(organizationId, id)

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }

        const response: StudentResponse = {
            id: student.id,
            userId: student.user.id,
            username: student.user.username,
            name: student.name,
            surname: student.surname,
            phone: student.phone,

            groups: student.groups.map(group => {
                return {
                    id: group.id,
                    name: group.name,
                    status: group.status,
                    direction: group.direction
                }
            }),
            permissions: student.user.permissions,
        }

        res.status(200).json({
            message: 'Retrive student',
            student: response
        })

    }
    catch(err) {
        next(err)
    }
}