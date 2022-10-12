import { TeacherDto } from '@models/index';
import { isTeacherExists, updateTeacher } from '@services/teacher.service';
import { updateUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isTeacherExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const { name, surname, birthday, phone, directions, username, password } = req.body
        
        const teacherDto: TeacherDto = {
            name,
            surname,
            birthday: new Date(Date.parse(birthday)),
            phone,
            directions
        }

        const teacher = await updateTeacher(id, teacherDto)
        const user = await updateUser(teacher.userId, username, password)
        
        res.json({
            message: "Teacher updated.",
            student: {
                id: teacher.id,
                userId: user.id,
                username: user.username,
                name: teacher.name,
                surname: teacher.surname,
                birthday: teacher.birthday,
                phone: teacher.birthday,
                role: user.role
            }
        })
    }
    catch(err) {
        next(err)
    }
}