import { allStudents } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await allStudents()
        
        const mapped = students.map(student => {
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
                        name: group.name
                    }
                })
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