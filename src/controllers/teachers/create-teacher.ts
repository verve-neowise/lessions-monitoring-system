import { TeacherDto, TeacherResponse, UserDto } from '@models/index'
import { createTeacher, findTeacherByUserId } from '@services/teacher.service'
import { createUser, findUser } from '@services/user.service'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const { name, surname, birthday, phone, directions } = req.body

        const existsUser = await findUser(username)

        if (existsUser) {
            return res.status(403).json({
                message: `user with username ${username} already exists.`,
            })
        }

        const userDto: UserDto = {
            username,
            password,
            role: 'teacher',
            permissions: [
                'directions',
                'groups',
                'profile',
                'students',
                'teachers',
            ],
        }

        const user = await createUser(userDto)

        const teacherDto: TeacherDto = {
            userId: user.id,
            name,
            surname,
            phone,
            directions,
        }

        const teacher = await createTeacher(teacherDto)

        const response: TeacherResponse = {
            id: teacher.id,
            userId: user.id,
            username: user.username,
            name: teacher.name,
            surname: teacher.surname,
            phone: teacher.phone,
            groups: [],
            directions: teacher.directions,
            permissions: user.permissions,
            role: user.role
        }

        res.json({
            message: 'teacher created.',
            teacher: response
        })
    } catch (err) {
        next(err)
    }
}
