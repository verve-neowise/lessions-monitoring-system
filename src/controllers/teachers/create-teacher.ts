import { TeacherDto, UserDto } from '@models/index';
import { createTeacher, findTeacherByUserId } from '@services/teacher.service';
import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body

        const existsUser = await findUser(username)

        if (existsUser) {
            return res.status(403).json({
                message: `user with username ${username} already exists.`
            })
        }

        const userDto: UserDto = {
            username,
            password,
            role: 'teacher',
            permissions: ['directions', 'groups', 'profile', 'students', 'teachers']
        }

        const user = await createUser(userDto)

        const { name, surname, birthday, phone, directions } = req.body
        
        const teacherDto: TeacherDto = {
            userId: user.id,
            name,
            surname,
            birthday: new Date(Date.parse(birthday)),
            phone,
            directions
        }

        const teacher = await createTeacher(teacherDto)

        res.json({
            message: "teacher created.",
            teacher: {
                id: teacher.id,
                name: teacher.name,
                username: user.username,
                password: user.password,
                permissions: user.permissions,
                role: user.role
            }
        })
    }
    catch(err) {
        next(err)
    }
}