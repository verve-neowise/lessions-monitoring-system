import { findStudentById, isStudentExists, updateStudent } from '@services/student.service';
import { StudentDto, StudentResponse } from '@models/index';
import { Request, Response, NextFunction } from 'express';
import { checkUsernameUnique, findUser, findUserById, updatePermissions, updateUser, updateUserName, updateUserPassword } from '@services/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const { name, surname, birthday, phone, username, password, permissions } = req.body

        const oldStudent = await findStudentById(id)

        if (!oldStudent) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        const { userId } = oldStudent

        const isUsernameUnique = await checkUsernameUnique(userId, username)

        if (!isUsernameUnique) {
            return res.status(403).json({
                message: "User with username: " + username + " already exists"
            })
        }


        // update username and password
        if (username && password && username.length > 0 && password.length > 0) {
            await updateUser(userId, username, password)
        }
        // update only username
        else if (username && username.length > 0) {
            await updateUserName(userId, username)
        }
        // update only password
        else if (password && password.length > 0) {
            await updateUserPassword(userId, password)
        }
        
        if (permissions && permissions.length > 0) {
            await updatePermissions(userId, permissions)
        }

        const studentDto: StudentDto = {
            name,
            surname,
            birthday: new Date(Date.parse(birthday)),
            phone,
        }

        const student = await updateStudent(id, studentDto)
        let user = (await findUserById(userId))!

        const response: StudentResponse = {
            id: student.id,
            userId: user.id,
            username: user.username,
            name: student.name,
            surname: student.surname,
            birthday: student.birthday,
            phone: student.phone,
            groups: student.groups,
            permissions: user.permissions,
        } 

        res.json({
            message: "Student updated.",
            student: response
        })
    }
    catch (err) {
        next(err)
    }
}