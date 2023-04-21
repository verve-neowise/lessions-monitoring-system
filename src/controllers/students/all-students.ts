import { StudentResponse } from '@models/student.dto';
import { EntityStatus } from '@prisma/client';
import { allStudents } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active

        const organizationId = +req.params.orgId 

        const students = await allStudents(organizationId, status)
        
        const mapped: StudentResponse[] = students.map(student => {
            return {
                id: student.id,
                userId: student.user.id,
                username: student.user.username,
                name: student.name,
                surname: student.surname,
                birthday: student.birthday,
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
        })

        res.json({
            message: "All students",
            students: mapped
        })
    }
    catch(err) {
        next(err)
    }
}