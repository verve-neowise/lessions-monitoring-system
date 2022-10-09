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
            permissions: ['directions', 'groups', 'profile', 'students']
        }

        const user = await createUser(userDto)

        const { name, surname, birthday, phone } = req.body
        
        const teacherDto: TeacherDto = {
            userId: user.id,
            name,
            surname,
            birthday,
            phone,
        }

        const teacher = await createTeacher(teacherDto)

        res.json({
            message: "teacher created.",
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}