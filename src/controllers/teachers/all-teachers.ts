import { TeacherResponse } from '@models/teacher.dto';
import { allTeachers } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const teachers = await allTeachers(organizationId)
        
        const mapped: TeacherResponse[] = teachers.map(teacher => {
            return {
                id: teacher.id,
                userId: teacher.user.id,
                username: teacher.user.username,
                name: teacher.name,
                surname: teacher.surname,
                phone: teacher.phone,
                groups: teacher.groups.map(group => {
                    return {
                        id: group.id,
                        name: group.name,
                        direction: {
                            id: group.direction.id,
                            name: group.direction.name
                        },
                        students: group._count.students
                    }
                }),
                directions: teacher.directions.map(direction => {
                    return {
                        id: direction.id,
                        name: direction.name
                    }
                }),
                permissions: teacher.user.permissions,
            }
        })
        
        res.json({
            message: "All teachers",
            teachers: mapped
        })
    }
    catch(err) {
        next(err)
    }
}