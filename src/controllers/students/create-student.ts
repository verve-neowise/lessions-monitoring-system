import { createStudent, isStudentExists } from './../../services/student.service';
import { UserDto } from './../../models/user.dto';
import { StudentDto, StudentResponse } from '@models/index';
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
            permissions: ['student']
        }

        const user = await createUser(userDto)

        const { name, surname, birthday, phone } = req.body
        
        const studentDto: StudentDto = {
            userId: user.id,
            name,
            surname,
            birthday: new Date(Date.parse(birthday)),
            phone,
        }

        const student = await createStudent(studentDto)

        const response: StudentResponse = {
            id: student.id,
            userId: user.id,
            username: user.username,
            name: student.name,
            surname: student.surname,
            birthday: student.birthday,
            phone: student.phone,
            groups: [],
            permissions: user.permissions,
        } 

        res.json({
            message: "student created.",
            student: response
        })
    }
    catch(err) {
        next(err)
    }
}