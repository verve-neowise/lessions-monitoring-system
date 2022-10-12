import { isStudentExists, updateStudent } from '@services/student.service';
import { StudentDto } from '@models/index';
import { Request, Response, NextFunction } from 'express';
import { findUser, updateUser } from '@services/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isStudentExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        const { name, surname, birthday, phone, username, password } = req.body
        
        const userFind = await findUser(username)

        if (userFind) {
            return res.status(403).json({
                message: "User with username: " + username + " already exists"
            })
        }

        const studentDto: StudentDto = {
            name,
            surname,
            birthday: new Date(Date.parse(birthday)),
            phone,
        }

        const student = await updateStudent(id, studentDto)
        const user = await updateUser(student.userId, username, password)
        
        res.json({
            message: "Student updated.",
            id: student.id,
            userId: user.id,
            name: student.name,
            username: user.username,
            role: user.role
        })
    }
    catch(err) {
        next(err)
    }
}