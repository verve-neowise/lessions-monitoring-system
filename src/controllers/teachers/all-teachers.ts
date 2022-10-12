import { allTeachers } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await allTeachers()
        
        const mapped = teachers.map(teacher => {
            return {
                id: teacher.id,
                userId: teacher.user.id,
                username: teacher.user.username,
                name: teacher.name,
                surname: teacher.surname,
                birthday: teacher.birthday,
                phone: teacher.phone,
                groups: teacher.groups.map(group => {
                    return {
                        id: group.id,
                        name: group.name
                    }
                }),
                directions: teacher.directions.map(direction => {
                    return {
                        id: direction.id,
                        name: direction.name
                    }
                })
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