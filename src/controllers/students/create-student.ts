import { createStudent, isStudentExists } from './../../services/student.service';
import { UserDto } from './../../models/user.dto';
import { StudentDto } from '@models/index';
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
            role: 'student',
            permissions: ['profile']
        }

        const user = await createUser(userDto)

        const { name, surname, birthday, phone } = req.body
        
        const studentDto: StudentDto = {
            userId: user.id,
            name,
            surname,
            birthday,
            phone,
        }

        const student = await createStudent(studentDto)

        res.json({
            message: "student created.",
            student
        })
    }
    catch(err) {
        next(err)
    }
}