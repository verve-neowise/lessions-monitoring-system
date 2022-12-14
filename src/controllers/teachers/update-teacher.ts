import { TeacherDto, TeacherResponse } from '@models/index';
import { findTeacherById, isTeacherExists, updateTeacher } from '@services/teacher.service';
import { checkUsernameUnique, findUserById, updateUser, updateUserName, updateUserPassword } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const { name, surname, phone, directions, username, password } = req.body

        const oldTeacher = await findTeacherById(id)
        
        if (!oldTeacher) {
            return res.status(403).json({
                message: "Teacher not found: " + id
            })
        }

        const { userId } = oldTeacher

        const isUsernameUnique = await checkUsernameUnique(userId, username)

        if (!isUsernameUnique) {
            return res.status(403).json({
                message: "User with username: " + username + " already exists"
            })
        }

        // update username and password
        if (username.length > 0 && password.length > 0) {
            await updateUser(userId, username, password)
        }
        // update only username
        else if (username.length > 0) {
            await updateUserName(userId, username)
        }
        // update only password
        else if (password.length > 0) {
            await updateUserPassword(userId, password)
        }
        const teacherDto: TeacherDto = {
            name,
            surname,
            phone,
            directions
        }

        const teacher = await updateTeacher(id, teacherDto)
        let user = (await findUserById(userId))!
          
        const response: TeacherResponse = {
            id: teacher.id,
            userId: user.id,
            username: user.username,
            name: teacher.name,
            surname: teacher.surname,
            phone: teacher.phone,
            groups: teacher.groups,
            directions: teacher.directions,
            permissions: user.permissions,
            role: user.role
        }
        
        res.json({
            message: "Teacher updated.",
            teacher: response
        })
    }
    catch(err) {
        next(err)
    }
}